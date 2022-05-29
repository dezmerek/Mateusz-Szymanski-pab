import express from 'express'
import {Request, Response} from 'express'
import {connect} from './db'

const platnosci = require('./routes/platnosc')
const uslugi = require('./routes/usluga')
const produkty = require('./routes/produkt')
const klienci = require('./routes/klient')
const pracownicy = require('./routes/pracownik')

const app = express()
app.use(express.json())
connect();

app.use('/platnosci', platnosci)
app.use('/uslugi', uslugi)
app.use('/produkty', produkty)
app.use('/klienci', klienci)
app.use('/pracownicy', pracownicy)

app.get("/", function (req: Request, res: Response) { res.send("Witaj w API - BarberShop"); });

app.listen(3000)