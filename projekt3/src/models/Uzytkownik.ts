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
    imie:{
        type: String,
        required: true
    },
    nazwisko:{
        type: String,
        required: true
    },
    jestAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
    klient:{
        type: Boolean,
        required: true,
        default: true
    },
    pracownik:{
        type: Boolean,
        required: true,
        default: false
    },
    email:{
        type: String,
        required: false
    },
    numerTelefonu:{
        type: String,
        required: true,
        length: 9
    }
})


const UzytkownikModel = mongoose.model("Uzytkownik", UzytkownikSchema);
export default UzytkownikModel