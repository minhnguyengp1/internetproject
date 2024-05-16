import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import fileRoute from './routes/file.route.js';
import cors from 'cors';
import homepageRoute from './routes/homepage.route.js';
import articleRoute from './routes/article.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.get('/api/allArticles', homepageRoute);
app.get('/api/allArticles/:categorie', homepageRoute);
app.use('/api/files', fileRoute);
app.use('/api/articles', articleRoute);
//app.use('/api/createArticle/', createArticle)

export default app;
