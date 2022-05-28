import { ChangeStreamDocument } from "mongodb";
import mongoose from 'mongoose';

export const connect = async (): Promise<void> => {

    // connection string
    console.log("Connecting to Mongo...")
    const connString = 'mongodb+srv://admin:admin@barbershop.owobcns.mongodb.net/?retryWrites=true&w=majority'

    // Przygotowanie komunikacji - połączenie z bazą danych
    const db = await mongoose.connect(connString)
    console.log('Mongo Connected!')

}