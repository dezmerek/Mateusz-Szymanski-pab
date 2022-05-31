import UzytkownikModel from "../models/Uzytkownik";
import {Request, Response, NextFunction} from 'express'
import express from 'express';
import bcrypt from 'bcrypt';
import { jestAdmin } from "./tokenVerify";

//validacja
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config("./.env");

const router = express.Router();
const app = express()


app.use(express.json())

//login
router.post('/login',async (req:Request, res:Response) => {
    try{
        const {login, haslo} = req.body;

        if(!login || !haslo)
            return res.status(400).json("Puste wartości.")

        //sprawdzenie, czy login istnieje
        const existsUser = await UzytkownikModel.findOne({login}).lean()

        if(!existsUser)
            return res.status(401).json("zły login lub hasło.")

        //hasło jest poprawne
        if(await bcrypt.compare(haslo, existsUser.haslo)){

            //utwórz i przypisz token
            const token = jwt.sign(
                {
                    _id: existsUser.id,
                    login: existsUser.login,
                    jestAdmin: existsUser.jestAdmin
                },
                process.env.JWT_SECRET
            )
            res.status(201).json({token})
        }

    }
    catch(error){
        return res.status(500).json(error)
    }
})

router.post('/register',async (req:Request, res:Response) => {
    try{
        //zweryfikujmy dane, zanim będziemy użytkownikiem
        const {login, email, imie, nazwisko, numerTelefonu, haslo: passwordBody} = req.body;

        if(!login || !email || !numerTelefonu || !passwordBody)
           return res.status(400).json("Puste wartości.")

        //sprawdzenie, czy użytkownik jest już w bazie danych
        const isUserExists = await UzytkownikModel.findOne({login})

        if(isUserExists)
           return res.status(401).json("Użytkownik istnieje.")

        //haszowania haseł
        const haslo = await bcrypt.hash(passwordBody, 10)

        const nowyUzytkownik = await new UzytkownikModel({
            login,
            haslo,
            imie,
            nazwisko,
            email,
            numerTelefonu,
        }).save()

        return res.status(200).json(nowyUzytkownik)
    }
    catch(error){
        return res.status(500).json(error)
    }

})

module.exports = router