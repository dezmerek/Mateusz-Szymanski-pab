import express from 'express'
import {Request, Response} from 'express'
import {connect} from './db'

const auths = require('./routes/auth')
const platnosci = require('./routes/platnosc')
const uslugi = require('./routes/usluga')
const produkty = require('./routes/produkt')

const app = express()
app.use(express.json())
connect();

app.use('/auth', auths)
app.use('/platnosci', platnosci)
app.use('/uslugi', uslugi)
app.use('/produkty', produkty)

app.get("/", function (req: Request, res: Response) { res.send("Witaj w API - BarberShop"); });

app.listen(3000, () => console.log("Server started"))