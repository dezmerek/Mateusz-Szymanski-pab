import mongoose from "mongoose";

const RezerwacjaSchema = new mongoose.Schema({
    termin: {
        type: Date,
        required: false
    },
    usluga: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usluga'
    },
    statusRezerwacji: {
        required: true,
        enum: ["zlozone", "wRealizacji", "zrealizowane", "rachunek"],
        type: String
    },
    platnosc: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Platnosc'
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