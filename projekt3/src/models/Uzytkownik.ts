import mongoose from "mongoose";

const UzytkownikSchema = new mongoose.Schema({
    login:{
        type: String,
        required: true,
        unique: true},
    haslo:{
        type: String,
        required: true
    },
    jestAmin:{
        type: Boolean,
        required: true,
        default: false
    },
    email:{
        type: String,
        required: true
    },
    numerTelefonu:{
        type: String,
        required: true,
        length: 9
    }
})


const UzytkownikModel = mongoose.model("Uzytkownik", UzytkownikSchema);
export default UzytkownikModel