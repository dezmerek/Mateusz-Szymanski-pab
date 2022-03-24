import express from 'express'
import {Request, Response} from 'express'
import fs from 'fs';

var app = express();

app.use(express.json())

class Notes {
    note:Note[] = []

    public addNote(args:any){
        const note = new Note(args.id,args.title,args.content,args.createdate,args.tags)
        this.note.push(note)
        this.updateStorage()
    }

    public readAllNotes(){
        this.readStorage()
        console.log(this.note);
        
        return this.note
    }

    constructor(){
        
    }

    private async readStorage(): Promise<void> {
        try {
            const data = await fs.promises.readFile("./data/notes.json", 'utf-8');            
            this.note = JSON.parse(data)
        } catch (err) {
            console.log(err)
        }
    }
    private async updateStorage(): Promise<void> {
        try {
            await fs.promises.writeFile("./data/notes.json", JSON.stringify(this.note));
        } catch (err) {
            console.log(err)
        }
      }
}

class Note {
    id:number
    title:string
    content:string
    createdate:Date
    tags:Tag[]
    constructor(id:number,title:string="",content:string="",createdate:Date=new Date,tags:Tag[]=[]) {
        this.id = id
        this.title = title
        this.content = content
        this.createdate = createdate
        this.tags = tags
    }
}

class Tag {
    id:number
    name:string
    constructor(name:string,id:number = Date.now()) {
        this.id = id
        this.name = name
    }
}
let tags = [
    new Tag("tag 1",1),
    new Tag("tag 2",2),
    new Tag("tag 3",3),
]

let notes = [
    new Note(1,"Przykładowa notatka","Przykładowa treść",new Date,tags),
]



app.post('/note',async function (req: Request, res: Response) {
    const notes = new Notes()
    notes.addNote(req.body)
    res.sendStatus(200)
});

app.post('/tag', function (req: Request, res: Response) {
    const name:string = req.body.name
    const id:number = req.body.id
    let exist = false
    tags.forEach(element => {
        if(element.name.toLowerCase() === name.toLowerCase()){
            exist = true
            return
        }
    });
    if(exist){
        res.status(400).send()
    }else{
        const tag = new Tag(name,id)
        tags.push(tag)
        res.status(200).send()
    }

});

app.get('/note/:id', async function (req: Request, res: Response) {
    let data = JSON.parse(await fs.promises.readFile("./data/notes.json", 'utf-8'));
    var id = parseInt(req.params.id);
    data.forEach((element:any) => {
        if(element.id === id){
            res.status(200).send(element)
        }
    });
    res.status(404).send()
});

app.get('/notes', async function (req: Request, res: Response) {
    const notes = new Notes()
    const data = notes.readAllNotes()
    if(data.length >0 ){
        res.status(200).send(data)
    }else{
        res.status(400).send("brak")
    }
});

app.get('/tags', function (req: Request, res: Response) {
    if(tags.length >0 ){
        res.status(200).send(tags)
    }else{
        res.status(400).send("brak")
    }
});

app.put('/note/:id', function (req: Request, res: Response) {
    var id = parseInt(req.params.id);
    for (const key in notes) {
        if (Object.prototype.hasOwnProperty.call(notes, key)) {
            const element = notes[key];
            if(element.id === id){
                notes[key] = new Note(req.body.id,req.body.title, req.body.content,new Date,[])
                res.status(200).send(notes[key])
            }
        }
    }
    res.status(404).send()

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
    res.status(400).send()
});

app.listen(3000,()=> console.log("Uruchomiona na porcie 3000"))