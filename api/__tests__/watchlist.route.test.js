import express from 'express';
import request from 'supertest';
import watchlistRouter from '../src/routes/watchlist.route.js';
import {
    addToWatchlist,
    removeFromWatchlist,
    getUserWatchlist,
} from '../src/controllers/watchlist.controller.js';

jest.mock('../src/controllers/watchlist.controller.js');

const app = express();
app.use(express.json());
app.use('/api/watchlist', watchlistRouter);

describe('Watchlist Router', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('POST /api/watchlist/add calls addToWatchlist', async () => {
        addToWatchlist.mockImplementation((req, res) =>
            res.status(200).json({ message: 'Article added to watchlist' }),
        );
        await request(app)
            .post('/api/watchlist/add')
            .send({ userId: 1, articleId: 1 })
            .expect(200);
        expect(addToWatchlist).toHaveBeenCalled();
    });

    test('POST /api/watchlist/remove calls removeFromWatchlist', async () => {
        removeFromWatchlist.mockImplementation((req, res) =>
            res.status(200).json({ message: 'Article removed from watchlist' }),
        );
        await request(app)
            .post('/api/watchlist/remove')
            .send({ userId: 1, articleId: 1 })
            .expect(200);
        expect(removeFromWatchlist).toHaveBeenCalled();
    });

    test('GET /api/watchlist/:userId calls getUserWatchlist', async () => {
        getUserWatchlist.mockImplementation((req, res) =>
            res.status(200).json([]),
        );
        await request(app).get('/api/watchlist/1').expect(200);
        expect(getUserWatchlist).toHaveBeenCalled();
    });
});
