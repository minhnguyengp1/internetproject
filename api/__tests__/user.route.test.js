import express from 'express';
import request from 'supertest';
import userRouter from '../src/routes/user.route.js';
import {
    getUser,
    deleteUser,
    updateUser,
    getUserArticles,
} from '../src/controllers/user.controller.js';
import {
    followUser,
    getUserFollowers,
    getUserFollowing,
    removeFollower,
    unfollowUser,
} from '../src/controllers/follower.controller.js';

jest.mock('../src/controllers/user.controller.js');
jest.mock('../src/controllers/follower.controller.js');

const app = express();
app.use(express.json());
app.use('/api/users', userRouter);

describe('User Router', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('GET /api/users/:userId calls getUser', async () => {
        getUser.mockImplementation((req, res) =>
            res.status(200).json({ userId: req.params.userId }),
        );
        await request(app).get('/api/users/1').expect(200);
        expect(getUser).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            expect.any(Function),
        );
    });

    test('DELETE /api/users/:userId calls deleteUser', async () => {
        deleteUser.mockImplementation((req, res) =>
            res.status(200).json({ message: 'User deleted successfully' }),
        );
        await request(app).delete('/api/users/1').expect(200);
        expect(deleteUser).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            expect.any(Function),
        );
    });

    test('PUT /api/users/:userId calls updateUser', async () => {
        updateUser.mockImplementation((req, res) =>
            res.status(200).json({ message: 'User updated successfully' }),
        );
        await request(app)
            .put('/api/users/1')
            .send({ fullName: 'New Name' })
            .expect(200);
        expect(updateUser).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            expect.any(Function),
        );
    });

    test('GET /api/users/:userId/articles calls getUserArticles', async () => {
        getUserArticles.mockImplementation((req, res) =>
            res.status(200).json([]),
        );
        await request(app).get('/api/users/1/articles').expect(200);
        expect(getUserArticles).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            expect.any(Function),
        );
    });

    test('GET /api/users/:userId/followers calls getUserFollowers', async () => {
        getUserFollowers.mockImplementation((req, res) =>
            res.status(200).json([]),
        );
        await request(app).get('/api/users/1/followers').expect(200);
        expect(getUserFollowers).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            expect.any(Function),
        );
    });

    test('GET /api/users/:userId/following calls getUserFollowing', async () => {
        getUserFollowing.mockImplementation((req, res) =>
            res.status(200).json([]),
        );
        await request(app).get('/api/users/1/following').expect(200);
        expect(getUserFollowing).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            expect.any(Function),
        );
    });

    test('PUT /api/users/:userId/follow/:strangerId calls followUser', async () => {
        followUser.mockImplementation((req, res) =>
            res.status(200).json({ message: 'User followed successfully' }),
        );
        await request(app).put('/api/users/1/follow/2').expect(200);
        expect(followUser).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            expect.any(Function),
        );
    });

    test('DELETE /api/users/:userId/follow/:strangerId calls unfollowUser', async () => {
        unfollowUser.mockImplementation((req, res) =>
            res.status(200).json({ message: 'User unfollowed successfully' }),
        );
        await request(app).delete('/api/users/1/follow/2').expect(200);
        expect(unfollowUser).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            expect.any(Function),
        );
    });

    test('DELETE /api/users/remove/:strangerId calls removeFollower', async () => {
        removeFollower.mockImplementation((req, res) =>
            res.status(200).json({ message: 'Follower removed successfully' }),
        );
        await request(app).delete('/api/users/remove/2').expect(200);
        expect(removeFollower).toHaveBeenCalledWith(
            expect.any(Object),
            expect.any(Object),
            expect.any(Function),
        );
    });
});
