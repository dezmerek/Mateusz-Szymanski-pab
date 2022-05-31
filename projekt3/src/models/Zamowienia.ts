import mongoose from "mongoose";

const ZamowieniaSchema = new mongoose.Schema({
    klient: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Klient'
    },
    produkt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'produkt',
        required: true
    },
    status: {
        type: String,
        enum: ["zlozone", "wRealizacji", "zrealizowane"],
        required: true
    },
    kwota: {
        type: Number,
        required: true
    },
    dataZamowienia: {
        type: Date,
        default: Date.now()
    },
    uzytkownik:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Uzytkownik'
    }
})

const ZamowieniaModel = mongoose.model("Zamowienia", ZamowieniaSchema);
export default ZamowieniaModel