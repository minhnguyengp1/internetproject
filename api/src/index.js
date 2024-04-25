import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import cors from 'cors';
import db from './dbs/init.mysql.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', authRoute);

export default app;
