import mongoose from "mongoose";

const ZamowieniaSchema = new mongoose.Schema({
    klient: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Klient'
    },
    produkt: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    kwota: {
        type: Number,
        required: true
    }
})

const ZamowieniaModel = mongoose.model("Zamowienia", ZamowieniaSchema);
export default ZamowieniaModel