import mongoose from "mongoose";

const ProduktSchema = new mongoose.Schema({
    nazwa: {
        type: String,
        required: true
    },
    cena: {
        type: Number,
        required: true
    },
    ilosc: {
        type: Number,
        required: true
    }
})

const ProduktModel = mongoose.model("Produkt", ProduktSchema);
export default ProduktModel