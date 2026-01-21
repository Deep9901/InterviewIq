import dotenv from 'dotenv';

// Load variables from the .env file into the application
// 'quiet: true' stops it from showing warnings if the file is missing
dotenv.config({quiet: true });

// Export all settings in one object so they are easier to use throughout the app
export const ENV = {
    PORT: process.env.PORT,                 // Port the server will run on
    DB_URI: process.env.DB_URI,             // Address for the MongoDB database
    JWT_SECRET: process.env.JWT_SECRET,     // Secret key for signing login tokens
    NODE_ENV: process.env.NODE_ENV,         // Current mode (e.g., 'development' or 'production')
    CLIENT_URL: process.env.CLIENT_URL,     // The URL of the frontend (for security/CORS)
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,     // Key to send events to Inngest
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY, // Key to verify requests from Inngest
    STREAM_API_KEY: process.env.STREAM_API_KEY,           // Public key for the Stream video/chat service
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,     // Private key for the Stream service
}