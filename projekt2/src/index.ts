import express, { json } from 'express'
import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {User} from "./models/user";

var app = express();

app.use(express.json())

const note = require("./note/note");
app.use("/note",note)

// app.post('/tag', function (req: Request, res: Response) {
//     const name:string = req.body.name
//     const id:number = req.body.id
//     let exist = false
//     tags.forEach(element => {
//         if(element.name.toLowerCase() === name.toLowerCase()){
//             exist = true
//             return
//         }
//     });
//     if(exist){
//         res.status(400).send()
//     }else{
//         const tag = new Tag(name,id)
//         tags.push(tag)
//         res.status(200).send()
//     }

// });



// app.get('/tags', function (req: Request, res: Response) {
//     if(tags.length >0 ){
//         res.status(200).send(tags)
//     }else{
//         res.status(400).send("brak")
//     }
// });


const login = require("./login/login");
app.use("/login",login)



app.listen(3000,()=> console.log("Uruchomiona na porcie 3000"))