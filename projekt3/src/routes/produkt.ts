import ProduktModel from "../models/Produkt";
import {Request, Response} from 'express'
import express from 'express';

const router = express.Router();
const app = express()
app.use(express.json())

// DODAJ NOWY PRODUKT
router.post('/add', async (req: Request, res: Response)=>
{
    const nowyProdukt = new ProduktModel({
            nazwa: req.body.nazwa,
            cena: req.body.cena,
            ilosc: req.body.ilosc
        })
        try{
            const zapiszProdukt = await nowyProdukt.save();
            return res.status(200).send("Dodano nowy produkt: " + nowyProdukt)
        }
        catch(error){
            return res.status(400).send("Nie udało sie dodać nowego produktu.")
        }
})

//SPRAWDZ ISTNIEJACE PRODUKTY
router.get('/getAll', async (req: Request, res: Response)=>{
    const produkty = await ProduktModel.find()
    return res .status(200).send(produkty)
})

router.get('/get/:id', async (req: Request, res: Response)=>{
    const produkt = await ProduktModel.findById(req.params.id)
    .then((result: any) =>{
        res.send(result);
    })
    .catch((err: any)=>{
        res.send("Produkt o takim id nie istnieje.");
    });
})

//UPDATE PRODUKTU
router.put('/edit/:id', async(req: Request, res: Response)=>{
    const nowyProdukt = new ProduktModel(req.body.id)
    try{
        const updateProdukt = await ProduktModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
       )
       res.status(200).send("Udalo sie edytowac produkt.")
    }
    catch(error){
        return res.status(500).send("Nie mamy produktu o takim id w bazie.")
    }
})

//USUN PRODUKT
router.delete('/delete/:id', async (req: Request, res: Response)=>
{
    try{
        await ProduktModel.findByIdAndDelete(req.params.id);
        return res.status(200).send("Produkt została usunięta.")
    }
    catch(error){
        return res.status(400).send("Produkt nie istnieje.")
    }
})

module.exports = router