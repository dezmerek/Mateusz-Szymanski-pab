import mongoose from "mongoose";

const PlatnoscSchema = new mongoose.Schema({
    platnoscOnline: {
        type: String,
        required: true
    },
    metodaPlatnosci: {
        type: String,
        enum: ["Karta debetowa/kredytowa", "Blik", "Gotowka"],
        required: true
    }
    })

const PlatnoscModel = mongoose.model("Platnosc", PlatnoscSchema);
export default PlatnoscModel