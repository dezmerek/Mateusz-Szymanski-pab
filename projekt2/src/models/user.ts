import fs from 'fs';
import {Note} from "./note";
import jwt from 'jsonwebtoken'
import {MongoClient} from "mongodb";

interface DataStorage{
    notes:Note[];
    AddNote(base:any): void;
    UpdateNote(base:any): void;
    DeleteNote(base:number): void;
    LoadData(): void
    UpdateData(): void
}



class UserFile{
    notes:Note[] = []
    userID?:number;
    public AddNote(args:any){
        const note = new Note(args.id,args.title,args.content,args.createdate,args.tags)
        this.notes.push(note)
        this.UpdateData()
    }

    public UpdateNote(args:any){
        for (const key in this.notes) {
            if (Object.prototype.hasOwnProperty.call(this.notes, key)) {
                const element = this.notes[key];
                if(element.id === args.id){
                    this.notes[key] = new Note(args.id,args.title, args.content,args.createdate,args.tags)
                    this.UpdateData()
                    return true
                }
            }
        }
        return false
    }

    public DeleteNote(id:number){
        for (let index = 0; index < this.notes.length; index++) {
            const element = this.notes[index];
            if(element.id === id){
                this.notes.splice(index);
                this.UpdateData()
                return true
            }
        }
        return false
    }

    constructor(args:any){
        const verify = this.Verify(args.Token)
        if (verify){
            this.LoadData()
            this.userID = 1 //verify.userID;
        }else{
            const login = this.Login(args.Login,args.Password)
            if(login){
                this.LoadData()
                this.userID = 1; //login.userID
            }
        }
    }

    public async LoadData(){
        const config = await import('../config.json')
        const data = fs.promises.readFile(config.FileDir, 'utf8')
        data.then((data)=>{
            Users = JSON.parse(data);
            Users.forEach(element => {
                if(this.userID === element.userID){
                    this.notes = element.notes
                }
            });
        })        
    }

    public async UpdateData(): Promise<void> {
        try {
            const config = await import('../config.json')
            Users.push(this)
            console.log(Users);
            await fs.promises.writeFile(config.FileDir, JSON.stringify(Users));
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
                return true
            }else{
                return false
            }
        } catch (error) {
            return false
        }
    }
}

let Users:UserFile[] = [];

export {UserFile,DataStorage}