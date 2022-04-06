import fs from 'fs';
import {Note} from "./note";
import jwt from 'jsonwebtoken'

class User {
    notes:Note[] = []
    
    public addNote(args:any){
        const note = new Note(args.id,args.title,args.content,args.createdate,args.tags)
        this.notes.push(note)
        this.updateStorage()
    }

    public updateNote(args:any){
        for (const key in this.notes) {
            if (Object.prototype.hasOwnProperty.call(this.notes, key)) {
                const element = this.notes[key];
                if(element.id === args.id){
                    this.notes[key] = new Note(args.id,args.title, args.content,args.createdate,args.tags)
                    this.updateStorage()
                    return true
                }
            }
        }
        return false
    }

    public deleteNote(id:number){
        for (let index = 0; index < this.notes.length; index++) {
            const element = this.notes[index];
            if(element.id === id){
                this.notes.splice(index);
                this.updateStorage()
                return true
            }
        }
        return false
    }

    constructor(){
        this.readFileWithPromise()     
    }

    public readFileWithPromise(){
        const data = fs.promises.readFile("./src/data/notes.json", 'utf8')
        data.then((data)=>{
            this.notes = JSON.parse(data);
        })
        
    }

    private async updateStorage(): Promise<void> {
        try {
            await fs.promises.writeFile("./src/data/notes.json", JSON.stringify(this.notes));
        } catch (err) {
            console.log(err)
        }
    }

    public Login(login:string,password:string){
        const com = {login:login,pass:password,notes:this.notes}
        const token = jwt.sign(JSON.stringify(com), "Bearer")
        return token
    }

    public Verify(token:string){
        try {
            const payload = jwt.verify(token, "Bearer") as any
            if(payload.login === "123" && payload.pass === "123"){
                console.log(payload);
                
                return true
            }else{
                return false
            }
        } catch (error) {
            return false
        }
    }
}

export {User}