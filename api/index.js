import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());

app.use(express.json());

await mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log('MongoDB connected!');
    })
    .catch((err) => console.log(err));

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log('Backend server is running!');
});
