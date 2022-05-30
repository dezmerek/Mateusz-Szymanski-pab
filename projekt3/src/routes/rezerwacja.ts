import RezerwacjaModel from "../models/Rezerwacja";
import {Request, Response} from 'express'
import express from 'express';
import { jestAdmin, isAuth } from "./tokenVerify";
import UzytkownikModel from "../models/Uzytkownik";
import UslugaModel from "../models/Usluga";

const jwt = require("jsonwebtoken");
const router = express.Router();
const app = express()
app.use(express.json())

router.post('/', async (req:Request, res:Response) => {
    const header = req.headers["authorization"]?.split(' ')[1];
    const uzytkownik = jwt.decode(header, process.env.secret)
    const wybranyUzytkownik = await UzytkownikModel.findOne({login: uzytkownik.login}).lean()
    const rezerwacja =  new RezerwacjaModel({
        klient: req.body.klient,
        usluga: req.body.usluga,
        uzytkownik: wybranyUzytkownik,
    })
    try{
        const wybranaUsluga = await UslugaModel.findOne(rezerwacja.travel)
        console.log(wybranaUsluga.isAvailable)

        if(wybranaUsluga.isAvailable == false)
           return res.status(400).json("Ta usługa nie może być zarezerwowana")
        else{
            console.log(rezerwacja.usluga)
            await UslugaModel.findOneAndUpdate(wybranaUsluga,
            {
                $set: {isAvailable: false}
            },
            {
                new: true
            })
            await wybranaUsluga.save()
            console.log(wybranaUsluga)

            await rezerwacja.save()
            return res.status(201).send("Gotowe. Dziękuję za rezerwację.")
        }
     }
    catch(error){
        res.status(500).json(error)
    }
})

router.delete('/:id', async (req:Request, res: Response) => {
    try{
        const header = req.headers["authorization"]?.split(' ')[1];
        const uzytkownik = jwt.decode(header, process.env.secret)
        const wybranyUzytkownik = await UzytkownikModel.findOne({login: uzytkownik.login})
        const wybranaRezerwacja = await RezerwacjaModel.findById(req.params.id)
        if(wybranaRezerwacja.uzytkownik.equals(wybranyUzytkownik._id))
        {
            await RezerwacjaModel.deleteOne({wybranaRezerwacja})
            return res.status(201).json("Rezerwacja została anulowana.")
        }
        else{
            return res.status(401).json("Nie możesz anulować tej rezerwacji.")
        }
    }
    catch(error){
        return res.status(500).json(error)
    }
})


router.get('/get',async (req:Request, res:Response) => {
    const header = req.headers["authorization"]?.split(' ')[1];
    const uzytkownik = jwt.decode(header, process.env.secret)
    const rezerwacje = await RezerwacjaModel.find({user: uzytkownik.login}).populate('usluga').populate('uzytkownik').populate('platnosc')
    return res.status(201).json(rezerwacje)
})

router.get('/getAll', isAuth, jestAdmin, async (req:Request, res:Response) => {
    const rezerwacje = await RezerwacjaModel.find().populate('usluga').populate('uzytkownik').populate('platnosc')
    return res.status(201).json(rezerwacje)
})

module.exports = router