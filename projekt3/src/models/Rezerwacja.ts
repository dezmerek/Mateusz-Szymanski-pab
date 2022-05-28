import mongoose from "mongoose";

const RezerwacjaSchema = new mongoose.Schema({
    pracownik: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pracownik'
    },
    start: {
        type: Date,
        required: true
    },
    koniec: {
        type: Date,
        required: true
    },
    klient: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Klient'
    }
})

const RezerwacjaModel = mongoose.model("Rezerwacja", RezerwacjaSchema);
export default RezerwacjaModel