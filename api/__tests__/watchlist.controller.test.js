import supertest from 'supertest';
import express from 'express';
import {
    addToWatchlist,
    removeFromWatchlist,
    getUserWatchlist,
} from '../src/controllers/watchlist.controller';
import db from '../src/dbs/init.mysql.js';
import { fetchImageUrls } from '../src/utils/helpers.js';

jest.mock('../src/dbs/init.mysql.js');
jest.mock('../src/utils/helpers.js');

const app = express();
app.use(express.json());

app.post('/api/watchlist', addToWatchlist);
app.delete('/api/watchlist', removeFromWatchlist);
app.get('/api/watchlist/:userId', getUserWatchlist);

describe('Watchlist Controller', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(5000, () => {
            done();
        });
    });

    afterAll((done) => {
        server.close(() => {
            done();
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('addToWatchlist', () => {
        it('should add an article to the watchlist', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const response = await supertest(app)
                .post('/api/watchlist')
                .send({
                    userId: 1,
                    articleId: 1,
                })
                .expect(200);

            expect(response.body).toHaveProperty(
                'message',
                'Article added to watchlist',
            );
        });
    });

    describe('removeFromWatchlist', () => {
        it('should remove an article from the watchlist', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const response = await supertest(app)
                .delete('/api/watchlist')
                .send({
                    userId: 1,
                    articleId: 1,
                })
                .expect(200);

            expect(response.body).toHaveProperty(
                'message',
                'Article removed from watchlist',
            );
        });
    });

    describe('getUserWatchlist', () => {
        // it('should get the watchlist for a user', async () => {
        //     const mockWatchlist = [
        //         {
        //             articleId: 1,
        //             userId: 1,
        //             title: 'Article 1',
        //             imgUrls: 'img1.jpg',
        //         },
        //         {
        //             articleId: 2,
        //             userId: 1,
        //             title: 'Article 2',
        //             imgUrls: 'img2.jpg',
        //         },
        //     ];
        //     db.query.mockImplementation((query, values, callback) => {
        //         callback(null, mockWatchlist);
        //     });
        //     fetchImageUrls.mockImplementation(async (imgUrls) => [
        //         `https://mockurl.com/${imgUrls}`,
        //     ]);
        //     const response = await supertest(app)
        //         .get('/api/watchlist/1')
        //         .expect(200);
        //     const expectedWatchlist = mockWatchlist.map((article) => ({
        //         ...article,
        //         imgUrls: [`https://mockurl.com/${article.imgUrls}`],
        //     }));
        //     expect(response.body).toEqual(expectedWatchlist);
        // });
    });
});
