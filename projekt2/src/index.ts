import express, { json } from 'express'
import {Request, Response} from 'express'
import fs from 'fs';
import jwt from 'jsonwebtoken'

var app = express();

app.use(express.json())

class Notes {
    note:Note[] = []

    public addNote(args:any){
        const note = new Note(args.id,args.title,args.content,args.createdate,args.tags)
        this.note.push(note)
        this.updateStorage()
    }

    constructor(){
        this.readFileWithPromise("./data/notes.json")     
    }

    public readFileWithPromise(file: string){
        const data = fs.promises.readFile(file, 'utf8')
        data.then((data)=>{
            this.note = JSON.parse(data);
        })
        
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
    const notes = new Notes()
    setTimeout(() => {
        
        var id = parseInt(req.params.id);
        notes.note.forEach((element:any) => {
            if(element.id === id){
                res.status(200).send(element)
            }
        });
        res.status(404).send()
    }, 100);
});

app.get('/notes', async function (req: Request, res: Response) {
    const notes = new Notes()
    setTimeout(() => {
        const data = notes.note
        if(data.length >0 ){
            res.status(200).send(data)
        }else{
            res.status(400).send("brak")
        }
    }, 100);
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
    const notes = new Notes()
    setTimeout(() => {
        
        for (const key in notes.note) {
            if (Object.prototype.hasOwnProperty.call(notes.note, key)) {
                const element = notes.note[key];
                if(element.id === id){
                    notes.note[key] = new Note(req.body.id,req.body.title, req.body.content,new Date,[])
                    res.status(200).send(notes.note[key])
                }
            }
        }
        res.status(404).send()
    }, 100);
});
app.delete('/note/:id', function (req: Request, res: Response) {
    var id = parseInt(req.params.id);
    const notes = new Notes()
    setTimeout(() => {
        
        for (let index = 0; index < notes.note.length; index++) {
            const element = notes.note[index];
            if(element.id === id){
                notes.note.splice(index);
                res.status(200).send()
            }
        }
        res.status(400).send()
    }, 100);
});

const MainLogin = 123
const MainPass = 123

app.post("/login",function (req:Request,res:Response) {
    
    if(req.headers.authorization === undefined){
        const login = req.body.login
        const pass = req.body.pass
        const notes = new Notes()
        setTimeout(() => {
            const com = {login:login,pass:pass,notes:notes.note}
            const token = jwt.sign(JSON.stringify(com), "Bearer")
            console.log(token);
            res.status(400).send()
        }, 100);
    }else{
        try {
            const payload = jwt.verify(req.headers.authorization, "Bearer") as any
            if(payload.login === MainLogin && payload.pass === MainPass){
                res.status(200).send(payload)
            }else{
                res.status(400).send("Token nie jest poprawny")
            }
        } catch (error) {
            res.status(400).send("Token nie jest poprawny")
        }
        
    }
    
})

app.listen(3000,()=> console.log("Uruchomiona na porcie 3000"))