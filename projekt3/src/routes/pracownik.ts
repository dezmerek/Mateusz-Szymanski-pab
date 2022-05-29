import PracownikModel from "../models/Pracownik";
import {Request, Response} from 'express'
import express from 'express';

const router = express.Router();
const app = express()
app.use(express.json())

// DODAJ NOWEGO PRACOWNIKA
router.post('/add', async (req: Request, res: Response)=>
{
    const nowyPracownik = new PracownikModel({
            imie: req.body.imie,
            nazwisko: req.body.nazwisko,
            numerTelefonu: req.body.numerTelefonu,
            jezyk: req.body.jezyk,
            stanowisko: req.body.stanowisko
        })
        try{
            const zapiszPracownik = await nowyPracownik.save();
            return res.status(200).send("Dodano nowego pracownika: " + nowyPracownik)
        }
        catch(error){
            return res.status(400).send("Nie udało sie dodać nowego pracownika.")
        }
})

//SPRAWDZ ISTNIEJACEGO PRACOWNIKA
router.get('/getAll', async (req: Request, res: Response)=>{
    const pracownicy = await PracownikModel.find()
    return res .status(200).send(pracownicy)
})

router.get('/get/:id', async (req: Request, res: Response)=>{
    const pracownik = await PracownikModel.findById(req.params.id)
    .then((result: any) =>{
        res.send(result);
    })
    .catch((err: any)=>{
        res.send("Pracownik o takim id nie istnieje.");
    });
})

//UPDATE PRACOWNIKA
router.put('/edit/:id', async(req: Request, res: Response)=>{
    const nowyPracownik = new PracownikModel(req.body.id)
    try{
        const updatePracownik = await PracownikModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
       )
       res.status(200).send("Udalo sie edytowac pracownika.")
    }
    catch(error){
        return res.status(500).send("Nie mamy pracownika o takim id w bazie.")
    }
})

//USUN PRACOWNIKA
router.delete('/delete/:id', async (req: Request, res: Response)=>
{
    try{
        await PracownikModel.findByIdAndDelete(req.params.id);
        return res.status(200).send("Pracownik został usunięty.")
    }
    catch(error){
        return res.status(400).send("Pracownik nie istnieje.")
    }
})

module.exports = router