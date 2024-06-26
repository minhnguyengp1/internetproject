import supertest from 'supertest';
import app from '../src/index';
import { closeDatabaseConnection } from '../src/dbs/init.mysql';

let server;

beforeAll((done) => {
    server = app.listen(5000, () => {
        done();
    });
});

afterAll(async () => {
    await closeDatabaseConnection();
    server.close();
});

describe('Article Routes', () => {
    let createdArticleId;

    it('should create a new article', async () => {
        const response = await supertest(app)
            .post('/api/articles')
            .send({
                category: 'elektronik',
                description: 'This is a test article.',
                price: 100,
                title: 'Test Article',
                userId: 1, // Ensure this userId exists in your database
                type: 'Festpreis',
                city: 'Stuttgart',
            })
            .expect(201);

        expect(response.body).toHaveProperty('articleId');
        createdArticleId = response.body.articleId;
    });

    it('should get all articles', async () => {
        const response = await supertest(app).get('/api/articles').expect(200);

        expect(response.body).toBeInstanceOf(Array);
    });

    it('should get an article by ID', async () => {
        const response = await supertest(app)
            .get(`/api/articles/${createdArticleId}`)
            .expect(200);

        expect(response.body).toHaveProperty('articleId', createdArticleId);
    });

    it('should update an article by ID', async () => {
        const response = await supertest(app)
            .put(`/api/articles/${createdArticleId}`)
            .send({
                category: 'elektronik',
                description: 'This is an updated test article.',
                price: 150,
                title: 'Updated Article',
                type: 'Festpreis',
                city: 'Stuttgart',
            })
            .expect(200);

        expect(response.body).toHaveProperty(
            'message',
            'Article updated successfully',
        );
    });

    it('should delete an article by ID', async () => {
        await supertest(app)
            .delete(`/api/articles/${createdArticleId}`)
            .expect(200);

        // Verify deletion
        await supertest(app)
            .get(`/api/articles/${createdArticleId}`)
            .expect(404);
    });

    it('should search for articles', async () => {
        const response = await supertest(app)
            .get('/api/articles/search?query=Test')
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
    });
});
