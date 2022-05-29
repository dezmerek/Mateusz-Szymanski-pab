import mongoose from "mongoose";

const PlatnoscSchema = new mongoose.Schema({
    platnoscOnline: {
        type: String,
        required: true
    },
    metodaPlatnosci: {
        type: String,
        required: true
    }
    })

const PlatnoscModel = mongoose.model("Platnosc", PlatnoscSchema);
export default PlatnoscModel