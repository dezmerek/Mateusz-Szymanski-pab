import PlatnoscModel from "../models/Platnosc";
import {Request, Response} from 'express'
import express from 'express';

const router = express.Router();
const app = express()
app.use(express.json())

// DODAJ NOWA METODE PLATNOSCI
router.post('/add', async (req: Request, res: Response)=>
{
    const nowaMetodaPlatnosci = new PlatnoscModel({
            platnoscOnline: req.body.platnoscOnline,
            metodaPlatnosci: req.body.metodaPlatnosci
        })
        try{
            const zapiszMetodePlatnosci = await nowaMetodaPlatnosci.save();
            return res.status(200).send("Dodano nową metode płatności: " + nowaMetodaPlatnosci)
        }
        catch(error){
            return res.status(400).send("Nie udało sie dodać nowej metody płatnośći.")
        }
})

//SPRAWDZ ISTNIEJACE METODY PLATNOSCI
router.get('/getAll', async (req: Request, res: Response)=>{
    const platnosci = await PlatnoscModel.find()
    return res .status(200).send(platnosci)
})

router.get('/get/:id', async (req: Request, res: Response)=>{
    const platnosc = await PlatnoscModel.findById(req.params.id)
    .then((result: any) =>{
        res.send(result);
    })
    .catch((err: any)=>{
        res.send("Metoda płatnośćo o takim id nie istnieje.");
    });
})

//UPDATE METODY PLATNOSCI
router.put('/edit/:id', async(req: Request, res: Response)=>{
    const nowaMetodaPlatnosci = new PlatnoscModel(req.body.id)
    try{
        const updatePlatnosc = await PlatnoscModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
       )
       res.status(200).send("Udalo sie edytowac metody płatności.")
    }
    catch(error){
        return res.status(500).send("Nie mamy matody platnosci o takim id w bazie.")
    }
})

//USUN METODE PLATNOSCI
router.delete('/delete/:id', async (req: Request, res: Response)=>
{
    try{
        await PlatnoscModel.findByIdAndDelete(req.params.id);
        return res.status(200).send("Metota płatnośći została usunięta.")
    }
    catch(error){
        return res.status(400).send("Metoda płatnośći nie istnieje.")
    }
})

module.exports = router