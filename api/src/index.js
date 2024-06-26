import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import cors from 'cors';
import articleRoute from './routes/article.route.js';
import reviewRoute from './routes/review.route.js';
import watchlistRoute from './routes/watchlist.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/articles', articleRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/watchlist', watchlistRoute);

export default app;
