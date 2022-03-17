import express from 'express'
import {Request, Response} from 'express'

var app = express();

app.use(express.json())

let notes = [{
    id:  1,
    title: "req.body.title",
    content: "req.body.content",
    createdate: "req.body.title",
    tags: "req.body.title"
}]

app.post('/note', function (req: Request, res: Response) {
    var note = {
        id: req.body.id || Date.now,
        title: req.body.title,
        content: req.body.content,
        createdate: req.body.title || new Date,
        tags: req.body.title || []
    }
    notes.push(note)
    res.sendStatus(200)
});
app.get('/note/:id', function (req: Request, res: Response) {
    var id = parseInt(req.params.id); 
    let note = notes.find( note => note.id === id)
    if(note == undefined){
        res.status(404).send()
    }else{
        res.status(200).send(note)
    }
});
app.put('/note/:id', function (req: Request, res: Response) {
    var id = parseInt(req.params.id);
    var json = req.body;
    var note = notes.find( not => not.id === id)

});
app.delete('/note/:id', function (req: Request, res: Response) {
    var id = parseInt(req.params.id);
    for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element.id === id){
            notes.splice(index);
            res.status(200).send()
        }
    }
    res.status(404).send()
});

app.listen(3000,()=> console.log("Uruchomiona na porcie 3000")) 