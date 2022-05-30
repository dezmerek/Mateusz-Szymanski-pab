import mongoose from "mongoose";

const RezerwacjaSchema = new mongoose.Schema({
    termin: {
        type: Date,
        required: true
    },
    terminKoniec: {
        type: Date,
        required: true
    },
    usluga: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usluga'
    },
    statusRezerwacji: {
        required: true,
        enum: ["wRealizacji", "zrealizowane"],
        default: 'wRealizacji',
        type: String
    },
    klient: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Uzytkownik'
    },
    pracownik: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Uzytkownik'
    },
    uzytkownik:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Uzytkownik'
    }
})

const RezerwacjaModel = mongoose.model("Rezerwacja", RezerwacjaSchema);
export default RezerwacjaModel