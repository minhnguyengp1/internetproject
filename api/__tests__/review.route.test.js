import express from 'express';
import request from 'supertest';
import reviewRouter from '../src/routes/review.route.js';
import {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getReviewsByAuthor,
    getReviewsBySubject,
} from '../src/controllers/review.controller.js';

jest.mock('../src/controllers/review.controller');

const app = express();
app.use(express.json());
app.use('/api/reviews', reviewRouter);

describe('Review Router', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('POST /api/reviews calls createReview', async () => {
        createReview.mockImplementation((req, res) =>
            res.status(201).json({ message: 'Review created successfully' }),
        );
        await request(app)
            .post('/api/reviews')
            .send({
                authorId: 1,
                subjectId: 1,
                text: 'Great product!',
                rating: 5,
            })
            .expect(201);

        expect(createReview).toHaveBeenCalled();
    });

    test('GET /api/reviews calls getReviews', async () => {
        getReviews.mockImplementation((req, res) => res.status(200).json([]));
        await request(app).get('/api/reviews').expect(200);

        expect(getReviews).toHaveBeenCalled();
    });

    test('GET /api/reviews/:reviewId calls getReviewById', async () => {
        getReviewById.mockImplementation((req, res) =>
            res.status(200).json({ reviewId: 1, text: 'Great product!' }),
        );
        await request(app).get('/api/reviews/1').expect(200);

        expect(getReviewById).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            expect.any(Function),
        );
    });

    test('PUT /api/reviews/:reviewId calls updateReview', async () => {
        updateReview.mockImplementation((req, res) =>
            res.status(200).json({ message: 'Review updated successfully' }),
        );
        await request(app)
            .put('/api/reviews/1')
            .send({ text: 'Updated review content', rating: 4 })
            .expect(200);

        expect(updateReview).toHaveBeenCalled();
    });

    test('DELETE /api/reviews/:reviewId calls deleteReview', async () => {
        deleteReview.mockImplementation((req, res) =>
            res.status(200).json({ message: 'Review deleted successfully' }),
        );
        await request(app).delete('/api/reviews/1').expect(200);

        expect(deleteReview).toHaveBeenCalled();
    });

    test('GET /api/reviews/author/:authorId calls getReviewsByAuthor', async () => {
        getReviewsByAuthor.mockImplementation((req, res) =>
            res.status(200).json([]),
        );
        await request(app).get('/api/reviews/author/1').expect(200);

        expect(getReviewsByAuthor).toHaveBeenCalled();
    });

    test('GET /api/reviews/subject/:subjectId calls getReviewsBySubject', async () => {
        getReviewsBySubject.mockImplementation((req, res) =>
            res.status(200).json([]),
        );
        await request(app).get('/api/reviews/subject/1').expect(200);

        expect(getReviewsBySubject).toHaveBeenCalled();
    });
});
