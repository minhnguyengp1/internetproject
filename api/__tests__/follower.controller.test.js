import supertest from 'supertest';
import express from 'express';
import {
    removeFollower,
    getUserFollowers,
    getUserFollowing,
    followUser,
    unfollowUser,
} from '../src/controllers/follower.controller'; // Ensure this path is correct
import db from '../src/dbs/init.mysql.js';
import { getBlobUrl } from '../src/services/azureStorageService.js';

jest.mock('../src/dbs/init.mysql.js');
jest.mock('../src/services/azureStorageService.js');

const app = express();
app.use(express.json());

app.post('/api/followers/remove', removeFollower);
app.get('/api/followers/:userId', getUserFollowers);
app.get('/api/following/:userId', getUserFollowing);
app.post('/api/follow/:userId/:strangerId', followUser);
app.delete('/api/unfollow/:userId/:strangerId', unfollowUser);

describe('Followers Controller', () => {
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

    // describe('removeFollower', () => {
    //     it('should remove a follower', async () => {
    //         db.query.mockImplementation((query, values, callback) => {
    //             callback(null, { affectedRows: 1 });
    //         });

    //         const response = await supertest(app)
    //             .post('/api/followers/remove')
    //             .send({
    //                 userId: 1,
    //                 strangerId: 2,
    //             })
    //             .expect(200);

    //         expect(response.body).toHaveProperty(
    //             'message',
    //             'Follower removed successfully',
    //         );
    //     });

    //     it('should return 500 if there is a database error', async () => {
    //         db.query.mockImplementation((query, values, callback) => {
    //             callback(new Error('Database error'), null);
    //         });

    //         const response = await supertest(app)
    //             .post('/api/followers/remove')
    //             .send({
    //                 userId: 1,
    //                 strangerId: 2,
    //             })
    //             .expect(500);

    //         expect(response.body).toHaveProperty(
    //             'error',
    //             'Internal server error',
    //         );
    //     });
    // });

    describe('getUserFollowers', () => {
        it('should get user followers', async () => {
            const mockFollowers = [
                {
                    userId: 1,
                    fullName: 'User One',
                    img: 'img1.jpg',
                    postalCode: '12345',
                    street: 'Street 1',
                    city: 'City 1',
                },
                {
                    userId: 2,
                    fullName: 'User Two',
                    img: 'img2.jpg',
                    postalCode: '67890',
                    street: 'Street 2',
                    city: 'City 2',
                },
            ];

            db.query.mockImplementation((query, values, callback) => {
                callback(null, mockFollowers);
            });

            getBlobUrl.mockImplementation(
                (img) => `https://mockurl.com/${img}`,
            );

            const response = await supertest(app)
                .get('/api/followers/1')
                .expect(200);

            const expectedFollowers = mockFollowers.map((follower) => ({
                ...follower,
                img: `https://mockurl.com/${follower.img}`,
            }));

            expect(response.body).toEqual(expectedFollowers);
        });

        it('should return 500 if there is a database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(new Error('Database error'), null);
            });

            const response = await supertest(app)
                .get('/api/followers/1')
                .expect(500);

            expect(response.body).toHaveProperty(
                'error',
                'Internal server error',
            );
        });
    });

    describe('getUserFollowing', () => {
        it('should get user following list', async () => {
            const mockFollowing = [
                {
                    userId: 1,
                    fullName: 'User One',
                    img: 'img1.jpg',
                    postalCode: '12345',
                    street: 'Street 1',
                    city: 'City 1',
                },
                {
                    userId: 2,
                    fullName: 'User Two',
                    img: 'img2.jpg',
                    postalCode: '67890',
                    street: 'Street 2',
                    city: 'City 2',
                },
            ];

            db.query.mockImplementation((query, values, callback) => {
                callback(null, mockFollowing);
            });

            getBlobUrl.mockImplementation(
                (img) => `https://mockurl.com/${img}`,
            );

            const response = await supertest(app)
                .get('/api/following/1')
                .expect(200);

            const expectedFollowing = mockFollowing.map((user) => ({
                ...user,
                img: `https://mockurl.com/${user.img}`,
            }));

            expect(response.body).toEqual(expectedFollowing);
        });

        it('should return 500 if there is a database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(new Error('Database error'), null);
            });

            const response = await supertest(app)
                .get('/api/following/1')
                .expect(500);

            expect(response.body).toHaveProperty(
                'error',
                'Internal server error',
            );
        });
    });

    describe('followUser', () => {
        it('should follow a user', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const response = await supertest(app)
                .post('/api/follow/1/2')
                .expect(201);

            expect(response.body).toHaveProperty(
                'message',
                'User followed successfully',
            );
        });

        it('should return 500 if there is a database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(new Error('Database error'), null);
            });

            const response = await supertest(app)
                .post('/api/follow/1/2')
                .expect(500);

            expect(response.body).toHaveProperty(
                'error',
                'Internal server error',
            );
        });
    });

    describe('unfollowUser', () => {
        it('should unfollow a user', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const response = await supertest(app)
                .delete('/api/unfollow/1/2')
                .expect(200);

            expect(response.body).toHaveProperty(
                'message',
                'User unfollowed successfully',
            );
        });

        it('should return 500 if there is a database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(new Error('Database error'), null);
            });

            const response = await supertest(app)
                .delete('/api/unfollow/1/2')
                .expect(500);

            expect(response.body).toHaveProperty(
                'error',
                'Internal server error',
            );
        });
    });
}, 30000); // Set the timeout to 30
