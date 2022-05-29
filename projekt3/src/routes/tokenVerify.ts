import {Request, Response, NextFunction} from 'express'
import UzytkownikModel from '../models/Uzytkownik';

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({
    path: './.env'
});


export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    if(header) {
        const token = header.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, async (err: any, data: any) => {
           if(err)
            return res.status(401).send("Brak dostępu")

            const tokenUzytkownik = JSON.parse(JSON.stringify(data))
            let uzytkownik = await UzytkownikModel.findOne({login: tokenUzytkownik.login})
            res.locals.uzytkownikInf = uzytkownik
        })
        next()
    }
    else{
        res.status(401).send("Brak dostępu")
    }

}

export const jestAdmin = (req: Request, res: Response, next: NextFunction) =>{
    isAuth(req, res, async () => {
        let user = await UzytkownikModel.findOne({jestAdmin: true})
        console.log(res.locals.uzytkownikInf.jestAdmin == true)

        if(!res.locals.uzytkownikInf.jestAdmin)
            return res.status(401).send("Nie jesteś administratorem.")
        else
            next()
    })
}
