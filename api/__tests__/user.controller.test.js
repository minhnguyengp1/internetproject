import supertest from 'supertest';
import express from 'express';
import multer from 'multer';
import {
    getUser,
    updateUser,
    getUserArticles,
} from '../src/controllers/user.controller';
import db from '../src/dbs/init.mysql.js';
import { getBlobUrl, uploadFile } from '../src/services/azureStorageService.js';
import { fetchImageUrls } from '../src/utils/helpers.js';

jest.mock('../src/dbs/init.mysql.js');
jest.mock('../src/services/azureStorageService.js');
jest.mock('../src/utils/helpers.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

app.get('/api/users/:userId', getUser);
app.put('/api/users/:userId', upload.single('img'), updateUser);
app.get('/api/users/:userId/articles', getUserArticles);

describe('User Controller', () => {
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

    describe('getUser', () => {
        it('should get a user by ID', async () => {
            const mockUser = {
                userId: 1,
                fullName: 'John Doe',
                email: 'john@example.com',
                street: '123 Main St',
                city: 'Anytown',
                postalCode: '12345',
                lastActiveTimeStamp: '2023-01-01T00:00:00.000Z',
                img: 'user-img.jpg',
            };

            db.query.mockImplementation((query, values, callback) => {
                callback(null, [mockUser]);
            });

            getBlobUrl.mockImplementation(
                (img) => `https://mockurl.com/${img}`,
            );

            const response = await supertest(app)
                .get('/api/users/1')
                .expect(200);

            const expectedUser = {
                ...mockUser,
                img: 'https://mockurl.com/user-img.jpg',
            };

            expect(response.body).toEqual(expectedUser);
        });

        it('should return 404 if the user is not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, []);
            });

            const response = await supertest(app)
                .get('/api/users/1')
                .expect(404);

            expect(response.body).toHaveProperty('message', 'User not found');
        });
    });

    describe('updateUser', () => {
        // it('should update a user', async () => {
        //     db.query.mockImplementation((query, values, callback) => {
        //         callback(null, { affectedRows: 1 });
        //     });

        //     uploadFile.mockImplementation(
        //         (file) => `https://mockurl.com/${file.originalname}`,
        //     );

        //     const response = await supertest(app)
        //         .put('/api/users/1')
        //         .field('fullName', 'John Doe Updated')
        //         .field('street', '456 New St')
        //         .field('city', 'Newtown')
        //         .field('postalCode', '67890')
        //         .attach(
        //             'img',
        //             Buffer.from('fake image content'),
        //             'user-img.jpg',
        //         )
        //         .expect(200);

        //     expect(response.body).toHaveProperty(
        //         'message',
        //         'User updated successfully',
        //     );
        // });

        it('should return 400 if no fields to update', async () => {
            const response = await supertest(app)
                .put('/api/users/1')
                .expect(400);

            expect(response.body).toHaveProperty(
                'message',
                'No fields to update',
            );
        });

        // it('should return 404 if the user is not found', async () => {
        //     db.query.mockImplementation((query, values, callback) => {
        //         callback(null, { affectedRows: 0 });
        //     });

        //     const response = await supertest(app)
        //         .put('/api/users/1')
        //         .field('fullName', 'John Doe Updated')
        //         .expect(404);

        //     expect(response.body).toHaveProperty(
        //         'message',
        //         'User not found or no changes made',
        //     );
        // });
    });

    describe('getUserArticles', () => {
        it('should get articles for a user', async () => {
            const mockArticles = [
                {
                    articleId: 1,
                    userId: 1,
                    title: 'Article 1',
                    imgUrls: 'img1.jpg',
                },
                {
                    articleId: 2,
                    userId: 1,
                    title: 'Article 2',
                    imgUrls: 'img2.jpg',
                },
            ];

            db.query.mockImplementation((query, values, callback) => {
                callback(null, mockArticles);
            });

            fetchImageUrls.mockImplementation(async (imgUrls) => [
                `https://mockurl.com/${imgUrls}`,
            ]);

            const response = await supertest(app)
                .get('/api/users/1/articles')
                .expect(200);

            const expectedArticles = mockArticles.map((article) => ({
                ...article,
                imgUrls: [`https://mockurl.com/${article.imgUrls}`],
            }));

            expect(response.body).toEqual(expectedArticles);
        });
    });
});
