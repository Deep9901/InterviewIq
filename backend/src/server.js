import express from 'express';
import { ENV } from './lib/env.js';

const app = express();

app.use(express.json());

const PORT = ENV.PORT;

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'API is up and running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});