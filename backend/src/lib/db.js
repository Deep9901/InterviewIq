import mongoose from 'mongoose';
import {ENV} from "./env.js"


export const connectDB = async () => {
    if(!ENV.DB_URI) {
        throw new Error("DB_URI is not defined in the Environmental variables");
    }
    try {
        const conn = await mongoose.connect(ENV.DB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

