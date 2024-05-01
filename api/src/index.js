import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import fileRouter from './routes/file.route.js';
import cors from 'cors';
import articlesRoute from './routes/homepage.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', authRoute);
app.get('/api/allArticles', articlesRoute);
app.get('/api/allArticles/:categorie', articlesRoute);
app.use('/api/files', fileRouter);

export default app;
