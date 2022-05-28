import mongoose from "mongoose";

const UslugaSchema = new mongoose.Schema({
    nazwa: {
        type: String,
        required: true
    },
    cena: {
        type: Number,
        required: true
    },
    czas: {
        type: String,
        required: true
    }
})

const UslugaModel = mongoose.model("Usluga", UslugaSchema);
export default UslugaModel