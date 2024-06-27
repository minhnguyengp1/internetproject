import express from 'express';
import request from 'supertest';
import authRouter from '../src/routes/auth.route.js';
import {
    login,
    register,
    requestPasswordReset,
    resetPassword,
    updatePassword,
} from '../src/controllers/auth.controller.js';

jest.mock('../src/controllers/auth.controller.js');

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

describe('Auth Router', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('POST /api/auth/register calls register', async () => {
        register.mockImplementation((req, res) =>
            res
                .status(200)
                .json({ message: 'User has been created successfully' }),
        );
        await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: 'password123',
                fullName: 'Test User',
            })
            .expect(200);
        expect(register).toHaveBeenCalled();
    });

    test('POST /api/auth/login calls login', async () => {
        login.mockImplementation((req, res) =>
            res.status(200).json({
                userId: 1,
                email: 'test@example.com',
                accessToken: 'token',
            }),
        );
        await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'password123' })
            .expect(200);
        expect(login).toHaveBeenCalled();
    });

    test('POST /api/auth/request-password-reset calls requestPasswordReset', async () => {
        requestPasswordReset.mockImplementation((req, res) =>
            res.status(200).json({
                message: 'Password reset instructions sent to test@example.com',
            }),
        );
        await request(app)
            .post('/api/auth/request-password-reset')
            .send({ email: 'test@example.com' })
            .expect(200);
        expect(requestPasswordReset).toHaveBeenCalled();
    });

    test('POST /api/auth/reset-password calls resetPassword', async () => {
        resetPassword.mockImplementation((req, res) =>
            res
                .status(200)
                .json({ message: 'Password has been reset successfully' }),
        );
        await request(app)
            .post('/api/auth/reset-password')
            .send({ token: 'reset-token', newPassword: 'newpassword123' })
            .expect(200);
        expect(resetPassword).toHaveBeenCalled();
    });

    test('PUT /api/auth/update-password calls updatePassword', async () => {
        updatePassword.mockImplementation((req, res) =>
            res.status(200).json({ message: 'Password updated successfully' }),
        );
        await request(app)
            .put('/api/auth/update-password')
            .send({
                userId: 1,
                currentPassword: 'oldpassword',
                newPassword: 'newpassword123',
            })
            .expect(200);
        expect(updatePassword).toHaveBeenCalled();
    });
});
