import express from 'express';
import request from 'supertest';
import articleRouter from '../src/routes/article.route.js';
import {
    createArticle,
    searchArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    getAllArticles,
} from '../src/controllers/article.controller.js';

jest.mock('../src/controllers/article.controller.js');

const app = express();
app.use(express.json());
app.use('/api/articles', articleRouter);

describe('Article Router', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('GET /api/articles calls getAllArticles', async () => {
        getAllArticles.mockImplementation((req, res) =>
            res.status(200).json([]),
        );
        await request(app).get('/api/articles').expect(200);
        expect(getAllArticles).toHaveBeenCalled();
    });

    test('GET /api/articles/search calls searchArticles', async () => {
        searchArticles.mockImplementation((req, res) =>
            res.status(200).json([]),
        );
        await request(app).get('/api/articles/search').expect(200);
        expect(searchArticles).toHaveBeenCalled();
    });

    test('POST /api/articles calls createArticle', async () => {
        createArticle.mockImplementation((req, res) =>
            res.status(201).json({ message: 'Article created successfully' }),
        );
        await request(app)
            .post('/api/articles')
            .send({
                title: 'New Article',
                description: 'Article description',
                price: 100,
            })
            .expect(201);
        expect(createArticle).toHaveBeenCalled();
    });

    test('GET /api/articles/:articleId calls getArticleById', async () => {
        getArticleById.mockImplementation((req, res) =>
            res.status(200).json({ articleId: req.params.articleId }),
        );
        await request(app).get('/api/articles/1').expect(200);
        expect(getArticleById).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            expect.any(Function),
        );
    });

    test('PUT /api/articles/:articleId calls updateArticle', async () => {
        updateArticle.mockImplementation((req, res) =>
            res.status(200).json({ message: 'Article updated successfully' }),
        );
        await request(app)
            .put('/api/articles/1')
            .send({
                title: 'Updated Article',
                description: 'Updated description',
                price: 150,
            })
            .expect(200);
        expect(updateArticle).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            expect.any(Function),
        );
    });

    test('DELETE /api/articles/:articleId calls deleteArticle', async () => {
        deleteArticle.mockImplementation((req, res) =>
            res.status(200).json({ message: 'Article deleted successfully' }),
        );
        await request(app).delete('/api/articles/1').expect(200);
        expect(deleteArticle).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            expect.any(Function),
        );
    });
});
