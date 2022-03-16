var express = require('express');
var app = express();
app.get('/', function (req, res) {
});
app.get('/dodaj/:one/:two', function (req, res) {
    var one = parseInt(req.params.one);
    var two = parseInt(req.params.two);
    var x = one + two;
    res.send(one + " + " + two + " = " + x);
});
app.get('/usun/:one/:two', function (req, res) {
    var one = parseInt(req.params.one);
    var two = parseInt(req.params.two);
    var x = one - two;
    res.send(one + " - " + two + " = " + x);
});
app.get('/podziel/:one/:two', function (req, res) {
    var one = parseInt(req.params.one);
    var two = parseInt(req.params.two);
    var x = one / two;
    res.send(one + " / " + two + " = " + x);
});
app.get('/pomnoz/:one/:two', function (req, res) {
    var one = parseInt(req.params.one);
    var two = parseInt(req.params.two);
    var x = one * two;
    res.send(one + " * " + two + " = " + x);
});
app.listen(3000);
