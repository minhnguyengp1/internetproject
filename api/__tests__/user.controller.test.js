import request from 'supertest';
import express from 'express';
import {
    getUser,
    updateUser,
    deleteUser,
    getUserArticles,
} from '../src/controllers/user.controller.js';
import { db } from '../src/dbs/init.mysql.js';
import { getBlobUrl, uploadFile } from '../src/services/azureStorageService.js';
import { fetchImageUrls } from '../src/utils/helpers.js';
import multer from 'multer';

jest.mock('../src/dbs/init.mysql.js');
jest.mock('../src/services/azureStorageService.js');
jest.mock('../src/utils/helpers.js');

const app = express();
app.use(express.json());

app.get('/api/users/:userId', getUser);
app.put('/api/users/:userId', updateUser);
app.delete('/api/users/:userId', deleteUser);
app.get('/api/users/:userId/articles', getUserArticles);

describe('User Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getUser', () => {
        it('should return user data', async () => {
            const mockUser = {
                userId: 1,
                fullName: 'John Doe',
                email: 'john@example.com',
                street: '123 Main St',
                city: 'Anytown',
                postalCode: '12345',
                lastActiveTimeStamp: '2023-01-01',
                img: 'profile.jpg',
            };
            db.query.mockImplementation((query, values, callback) => {
                callback(null, [mockUser]);
            });
            getBlobUrl.mockReturnValue('https://mockurl.com/profile.jpg');

            const response = await request(app).get('/api/users/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                ...mockUser,
                img: 'https://mockurl.com/profile.jpg',
            });
        });

        it('should return 404 if user not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, []);
            });

            const response = await request(app).get('/api/users/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'User not found' });
        });

        it('should return 500 on database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(new Error('Database error'), null);
            });

            const response = await request(app).get('/api/users/1');

            expect(response.status).toBe(500);
        });
    });

    describe('updateUser', () => {
        it('should update user data', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const response = await request(app)
                .put('/api/users/1')
                .field('fullName', 'John Doe Updated')
                .attach('img', Buffer.from('file buffer'), 'test.jpg');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'User updated successfully',
            });
        });

        it('should return 404 if user not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, { affectedRows: 0 });
            });

            const response = await request(app)
                .put('/api/users/1')
                .field('fullName', 'John Doe Updated');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                message: 'User not found or no changes made',
            });
        });

        it('should return 500 on database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(new Error('Database error'), null);
            });

            const response = await request(app)
                .put('/api/users/1')
                .field('fullName', 'John Doe Updated');

            expect(response.status).toBe(500);
        });

        it('should return 400 if no fields to update', async () => {
            const response = await request(app).put('/api/users/1');

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'No fields to update' });
        });
    });

    describe('deleteUser', () => {
        it('should delete user', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const response = await request(app).delete('/api/users/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'User deleted successfully',
            });
        });

        it('should return 404 if user not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, { affectedRows: 0 });
            });

            const response = await request(app).delete('/api/users/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'User not found' });
        });

        it('should return 500 on database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(new Error('Database error'), null);
            });

            const response = await request(app).delete('/api/users/1');

            expect(response.status).toBe(500);
        });
    });

    describe('getUserArticles', () => {
        it('should return user articles', async () => {
            const mockArticles = [
                {
                    articleId: 1,
                    title: 'Article 1',
                    description: 'Description 1',
                    imgUrls: 'image1.jpg,image2.jpg',
                },
            ];
            db.query.mockImplementation((query, values, callback) => {
                callback(null, mockArticles);
            });
            fetchImageUrls.mockResolvedValue([
                'https://mockurl.com/image1.jpg',
                'https://mockurl.com/image2.jpg',
            ]);

            const response = await request(app).get('/api/users/1/articles');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                {
                    ...mockArticles[0],
                    imgUrls: [
                        'https://mockurl.com/image1.jpg',
                        'https://mockurl.com/image2.jpg',
                    ],
                },
            ]);
        });

        it('should return 500 on database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(new Error('Database error'), null);
            });

            const response = await request(app).get('/api/users/1/articles');

            expect(response.status).toBe(500);
        });
    });
});
