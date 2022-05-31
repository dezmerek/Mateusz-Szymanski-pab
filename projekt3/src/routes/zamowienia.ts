import ZamowieniaModel from "../models/Zamowienia";
import {Request, Response} from 'express'
import express from 'express';
import { jestAdmin, isAuth } from "./tokenVerify";
import UzytkownikModel from "../models/Uzytkownik";
import ProduktModel from "../models/Produkt";

const jwt = require("jsonwebtoken");
const router = express.Router();
const app = express()
app.use(express.json())

router.post('/add', async (req:Request, res:Response) => {
    const header = req.headers["authorization"]?.split(' ')[1];
    const uzytkownik = jwt.decode(header, process.env.secret)
    const wybranyUzytkownik = await UzytkownikModel.findOne({login: uzytkownik.login}).lean()
    const zamowienie =  new ZamowieniaModel({
        klient: req.body.klient,
        produkt: req.body.produkt,
        status: req.body.status,
        kwota: req.body.kwota,
        dataZamowienia: req.body.dataZamowienia,
        uzytkownik: wybranyUzytkownik,
    })
    try{
        const wybranyPordukt = await ProduktModel.findOne(zamowienie.produkt)
        console.log(wybranyPordukt.isAvailable)

        if(wybranyPordukt.isAvailable == false)
           return res.status(400).json("Ten produkt nie może być zamówiony")
        else{
            console.log(zamowienie.produkt)
            await ProduktModel.findOneAndUpdate(wybranyPordukt,
            {
                $set: {isAvailable: false}
            },
            {
                new: true
            })
            await wybranyPordukt.save()
            console.log(wybranyPordukt)

            await zamowienie.save()
            return res.status(201).send("Gotowe. Dziękuję za zamówienie.")
        }
     }
    catch(error){
        res.status(500).json(error)
    }
})

router.delete('/delete/:id', async (req:Request, res: Response) => {
    try{
        const header = req.headers["authorization"]?.split(' ')[1];
        const uzytkownik = jwt.decode(header, process.env.secret)
        const wybranyUzytkownik = await UzytkownikModel.findOne({login: uzytkownik.login})
        const wybranaRezerwacja = await ZamowieniaModel.findById(req.params.id)
        if(wybranaRezerwacja.uzytkownik.equals(wybranyUzytkownik._id))
        {
            await ZamowieniaModel.deleteOne({wybranaRezerwacja})
            return res.status(201).json("Zamówienie zostało anulowane.")
        }
        else{
            return res.status(401).json("Nie możesz anulować tego zamówienia.")
        }
    }
    catch(error){
        return res.status(500).json(error)
    }
})


router.get('/get',async (req:Request, res:Response) => {
    const header = req.headers["authorization"]?.split(' ')[1];
    const uzytkownik = jwt.decode(header, process.env.secret)
    const zamowienie = await ZamowieniaModel.find({user: uzytkownik.login}).populate('klient').populate('produkt').populate('status').populate('kwota').populate('dataZamowienia')
    return res.status(201).json(zamowienie)
})

router.get('/getAll', isAuth, jestAdmin, async (req:Request, res:Response) => {
    const zamowienie = await ZamowieniaModel.find().populate('klient').populate('produkt').populate('status').populate('kwota').populate('dataZamowienia')
    return res.status(201).json(zamowienie)
})

module.exports = router