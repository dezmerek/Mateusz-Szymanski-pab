import mongoose from "mongoose";

const PracownikSchema = new mongoose.Schema({
    imie: {
        type: String,
        required: true
    },
    nazwisko: {
        type: String,
        required: true
    },
    numerTelefonu: {
        type: Number,
        required: true
    },
    jezyk: {
        type: String,
        required: false
    },
    stanowisko: {
        type: String,
        required: true
    }
    })

const PracownikModel = mongoose.model("Pracownik", PracownikSchema);
export default PracownikModel