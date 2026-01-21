import mongoose from 'mongoose';
import {ENV} from "./env.js"

// Asynchronous function to establish the database connection
export const connectDB = async () => {
    // Check if the database address (URI) exists in the environment variables
    if(!ENV.DB_URI) {
        throw new Error("DB_URI is not defined in the Environmental variables");
    }
    
    try {
        // Attempt to connect to MongoDB using the URI
        const conn = await mongoose.connect(ENV.DB_URI);
        
        // Log a success message with the host name if connected
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If connection fails, log the error message
        console.error(`Error: ${error.message}`);
        
        // Stop the server/process immediately with a failure code (1)
        process.exit(1);
    }
};