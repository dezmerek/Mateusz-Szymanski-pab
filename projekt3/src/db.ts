import { ChangeStreamDocument } from "mongodb";
import mongoose from 'mongoose';

export const connect = async (): Promise<void> => {

    // connection string
    const connString = 'mongodb+srv://admin:admin@barbershop.owobcns.mongodb.net/?retryWrites=true&w=majority'

    // Przygotowanie komunikacji - połączenie z bazą danych
    const db = await mongoose.connect(connString)
    console.log('Mongo Connected!')

}