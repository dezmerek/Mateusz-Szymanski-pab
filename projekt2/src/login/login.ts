import express, { json } from 'express'
import {Request, Response} from 'express'
import {User} from "../models/user"

const router = express.Router()

router.use((req,res,next)=>{
    console.log('Time: ', Date.now())
    next()
})

router.post("/",function (req:Request,res:Response) {
    const user = new User()
    if(req.headers.authorization === undefined){
        const result = user.Login(req.body.login,req.body.password)
        console.log(result);
        
        if(result){
            res.status(200).send("Zalogowano")
        }else{
            res.status(400).send("Nie poprawne hasło lub login")
        }
    }else{
        const result = user.Verify(req.headers.authorization)
        if(result){
            res.status(200).send("Zalogowano")
        }else{
            res.status(400).send("Nie poprawny Token")
        }        
    }
})

module.exports = router