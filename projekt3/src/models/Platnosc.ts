import mongoose from "mongoose";

const PlatnoscSchema = new mongoose.Schema({
    platnoscOnline: {
        type: Boolean,
        required: true
    },
    rodzajPlatnosci: {
        type: String,
        required: true
    }
    })

const PlatnoscModel = mongoose.model("Platnosc", PlatnoscSchema);
export default PlatnoscModel