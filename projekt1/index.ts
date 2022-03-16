const express = require('express')
const app = express()
app.get('/', function (req, res) {
})
app.get('/dodaj/:one/:two', function (req, res) {
    let one = parseInt(req.params.one)
    let two = parseInt(req.params.two)
    let x = one+two
    res.send(one+" + "+two+" = "+x)
})
app.get('/usun/:one/:two', function (req, res) {
    let one = parseInt(req.params.one)
    let two = parseInt(req.params.two)
    let x = one-two
    res.send(one+" - "+two+" = "+x)
})
app.get('/podziel/:one/:two', function (req, res) {
    let one = parseInt(req.params.one)
    let two = parseInt(req.params.two)
    let x = one/two
    res.send(one+" / "+two+" = "+x)
})
app.get('/pomnoz/:one/:two', function (req, res) {
    let one = parseInt(req.params.one)
    let two = parseInt(req.params.two)
    let x = one*two
    res.send(one+" * "+two+" = "+x)
})
app.listen(3000)