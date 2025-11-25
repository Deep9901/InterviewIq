import express from 'express';
import { ENV } from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import {serve} from inngest/express;
import { inngest, functions } from "./lib/inngest.js";


const app = express();

const __dirname = path.resolve();


// middleware

app.use(express.json())
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true
}))


const PORT = ENV.PORT;

// routes

app.use("/api/inngest", serve({ client: inngest, functions }));


app.get('/health', (req, res) => {
    res.status(200).json({ message: 'API is up and running' });
});

if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get('/{*any}', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', "dist", 'index.html'));
    });
}



const startSever = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.error("Error starting the server",error);
    }
}

startSever();