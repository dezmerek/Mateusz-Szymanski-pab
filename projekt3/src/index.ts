import express from 'express'
import {Request, Response} from 'express'
import {connect} from './db'

const platnosci = require('./routes/platnosc')

const app = express()
app.use(express.json())
connect();

app.use('/platnosci', platnosci)

app.get("/", function (req: Request, res: Response) { res.send("Witaj w API - BarberShop"); });

app.listen(3000)