import mongoose from "mongoose";

const KlientSchema = new mongoose.Schema({
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
    }
    })

const KlientModel = mongoose.model("Klient", KlientSchema);
export default KlientModel