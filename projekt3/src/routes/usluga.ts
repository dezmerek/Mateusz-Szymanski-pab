import UslugaModel from "../models/Usluga";
import {Request, Response} from 'express'
import express from 'express';
import { jestAdmin, isAuth } from "./tokenVerify";

const router = express.Router();
const app = express()
app.use(express.json())

// DODAJ NOWA USLUGE
router.post('/add', isAuth, jestAdmin, async (req: Request, res: Response)=>
{
    const nowaUsluga = new UslugaModel({
            nazwa: req.body.nazwa,
            cena: req.body.cena,
            czas: req.body.czas
        })
        try{
            const zapiszUsluge = await nowaUsluga.save();
            return res.status(200).send("Dodano nową usługe: " + nowaUsluga)
        }
        catch(error){
            return res.status(400).send("Nie udało sie dodać nowej usługi.")
        }
})

//SPRAWDZ ISTNIEJACE USLUGE
router.get('/getAll', async (req: Request, res: Response)=>{
    const uslugi = await UslugaModel.find()
    return res .status(200).send(uslugi)
})

router.get('/get/:id', async (req: Request, res: Response)=>{
    const usluga = await UslugaModel.findById(req.params.id)
    .then((result: any) =>{
        res.send(result);
    })
    .catch((err: any)=>{
        res.send("Usługa o takim id nie istnieje.");
    });
})

//UPDATE USLUGI
router.put('/edit/:id', async(req: Request, res: Response)=>{
    const nowaUsluga = new UslugaModel(req.body.id)
    try{
        const updateUsluga = await UslugaModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
       )
       res.status(200).send("Udalo sie edytowac usługe.")
    }
    catch(error){
        return res.status(500).send("Nie mamy usługi o takim id w bazie.")
    }
})

//USUN USLUGE
router.delete('/delete/:id', async (req: Request, res: Response)=>
{
    try{
        await UslugaModel.findByIdAndDelete(req.params.id);
        return res.status(200).send("Usługa została usunięta.")
    }
    catch(error){
        return res.status(400).send("Usługa nie istnieje.")
    }
})

module.exports = router