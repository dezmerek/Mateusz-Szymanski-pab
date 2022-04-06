import {Tag} from "./tag";

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

export {Note}