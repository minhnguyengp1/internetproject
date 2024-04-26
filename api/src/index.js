import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import cors from 'cors';
import articlesRoute from './routes/homepage.route.js';
import db from './dbs/init.mysql.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', authRoute);
app.get('/api/allArticles', articlesRoute);
app.get('/api/allArticles/:categorie', articlesRoute);

export default app;
