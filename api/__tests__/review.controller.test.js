import supertest from 'supertest';
import express from 'express';
import {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getReviewsByAuthor,
    getReviewsBySubject,
} from '../src/controllers/review.controller';
import db from '../src/dbs/init.mysql.js';

jest.mock('../src/dbs/init.mysql.js');

const app = express();
app.use(express.json());

app.post('/api/reviews', createReview);
app.get('/api/reviews', getReviews);
app.get('/api/reviews/:reviewId', getReviewById);
app.put('/api/reviews/:reviewId', updateReview);
app.delete('/api/reviews/:reviewId', deleteReview);
app.get('/api/reviews/author/:authorId', getReviewsByAuthor);
app.get('/api/reviews/subject/:subjectId', getReviewsBySubject);

describe('Reviews Controller', () => {
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

    describe('createReview', () => {
        it('should create a new review', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, { insertId: 1 });
            });

            const response = await supertest(app)
                .post('/api/reviews')
                .send({
                    authorId: 1,
                    subjectId: 1,
                    text: 'Great product!',
                    rating: 5,
                })
                .expect(201);

            expect(response.body).toHaveProperty(
                'message',
                'Review created successfully',
            );
            expect(response.body).toHaveProperty('reviewId', 1);
        });
    });

    describe('getReviews', () => {
        it('should get all reviews', async () => {
            const mockReviews = [
                {
                    reviewId: 1,
                    authorId: 1,
                    subjectId: 1,
                    text: 'Great product!',
                    rating: 5,
                },
                {
                    reviewId: 2,
                    authorId: 2,
                    subjectId: 2,
                    text: 'Not bad',
                    rating: 3,
                },
            ];

            db.query.mockImplementation((query, callback) => {
                callback(null, mockReviews);
            });

            const response = await supertest(app)
                .get('/api/reviews')
                .expect(200);

            expect(response.body).toEqual(mockReviews);
        });
    });

    describe('getReviewById', () => {
        it('should get a review by ID', async () => {
            const mockReview = {
                reviewId: 1,
                authorId: 1,
                subjectId: 1,
                text: 'Great product!',
                rating: 5,
            };

            db.query.mockImplementation((query, values, callback) => {
                callback(null, [mockReview]);
            });

            const response = await supertest(app)
                .get('/api/reviews/1')
                .expect(200);

            expect(response.body).toEqual(mockReview);
        });

        it('should return 404 if the review is not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, []);
            });

            const response = await supertest(app)
                .get('/api/reviews/1')
                .expect(404);

            expect(response.body).toHaveProperty('message', 'Review not found');
        });
    });

    describe('updateReview', () => {
        it('should update a review by ID', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const response = await supertest(app)
                .put('/api/reviews/1')
                .send({
                    text: 'Updated review',
                    rating: 4,
                })
                .expect(200);

            expect(response.body).toHaveProperty(
                'message',
                'Review updated successfully',
            );
        });

        it('should return 404 if the review is not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, { affectedRows: 0 });
            });

            const response = await supertest(app)
                .put('/api/reviews/1')
                .send({
                    text: 'Updated review',
                    rating: 4,
                })
                .expect(404);

            expect(response.body).toHaveProperty('message', 'Review not found');
        });
    });

    describe('deleteReview', () => {
        it('should delete a review by ID', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const response = await supertest(app)
                .delete('/api/reviews/1')
                .expect(200);

            expect(response.body).toHaveProperty(
                'message',
                'Review deleted successfully',
            );
        });

        it('should return 404 if the review is not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, { affectedRows: 0 });
            });

            const response = await supertest(app)
                .delete('/api/reviews/1')
                .expect(404);

            expect(response.body).toHaveProperty('message', 'Review not found');
        });
    });

    describe('getReviewsByAuthor', () => {
        it('should get reviews by a specific author', async () => {
            const mockReviews = [
                {
                    reviewId: 1,
                    authorId: 1,
                    subjectId: 1,
                    text: 'Great product!',
                    rating: 5,
                },
                {
                    reviewId: 2,
                    authorId: 1,
                    subjectId: 2,
                    text: 'Not bad',
                    rating: 3,
                },
            ];

            db.query.mockImplementation((query, values, callback) => {
                callback(null, mockReviews);
            });

            const response = await supertest(app)
                .get('/api/reviews/author/1')
                .expect(200);

            expect(response.body).toEqual(mockReviews);
        });
    });

    describe('getReviewsBySubject', () => {
        it('should get reviews for a specific subject', async () => {
            const mockReviews = [
                {
                    reviewId: 1,
                    authorId: 1,
                    subjectId: 1,
                    text: 'Great product!',
                    rating: 5,
                },
                {
                    reviewId: 2,
                    authorId: 2,
                    subjectId: 1,
                    text: 'Not bad',
                    rating: 3,
                },
            ];

            db.query.mockImplementation((query, values, callback) => {
                callback(null, mockReviews);
            });

            const response = await supertest(app)
                .get('/api/reviews/subject/1')
                .expect(200);

            expect(response.body).toEqual(mockReviews);
        });
    });
});
