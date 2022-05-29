import KlientModel from "../models/Klient";
import {Request, Response} from 'express'
import express from 'express';

const router = express.Router();
const app = express()
app.use(express.json())

// DODAJ NOWEGO KLIENTA
router.post('/add', async (req: Request, res: Response)=>
{
    const nowyKlient = new KlientModel({
            imie: req.body.imie,
            nazwisko: req.body.nazwisko,
            numerTelefonu: req.body.numerTelefonu
        })
        try{
            const zapiszKlient = await nowyKlient.save();
            return res.status(200).send("Dodano nowego klienta: " + nowyKlient)
        }
        catch(error){
            return res.status(400).send("Nie udało sie dodać nowego klienta.")
        }
})

//SPRAWDZ ISTNIEJACEGO KLIENTA
router.get('/getAll', async (req: Request, res: Response)=>{
    const klienci = await KlientModel.find()
    return res .status(200).send(klienci)
})

router.get('/get/:id', async (req: Request, res: Response)=>{
    const klient = await KlientModel.findById(req.params.id)
    .then((result: any) =>{
        res.send(result);
    })
    .catch((err: any)=>{
        res.send("Klient o takim id nie istnieje.");
    });
})

//UPDATE KLIENTA
router.put('/edit/:id', async(req: Request, res: Response)=>{
    const nowyKlient = new KlientModel(req.body.id)
    try{
        const updateKlientt = await KlientModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
       )
       res.status(200).send("Udalo sie edytowac klienta.")
    }
    catch(error){
        return res.status(500).send("Nie mamy klienta o takim id w bazie.")
    }
})

//USUN KLIENTA
router.delete('/delete/:id', async (req: Request, res: Response)=>
{
    try{
        await KlientModel.findByIdAndDelete(req.params.id);
        return res.status(200).send("Klient został usunięty.")
    }
    catch(error){
        return res.status(400).send("Klient nie istnieje.")
    }
})

module.exports = router