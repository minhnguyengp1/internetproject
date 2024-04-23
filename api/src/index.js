import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import cors from 'cors';
import db from './dbs/init.mongodb.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);

export default app;
