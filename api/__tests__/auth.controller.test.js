import supertest from 'supertest';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import {
    register,
    login,
    requestPasswordReset,
    resetPassword,
    updatePassword,
} from '../src/controllers/auth.controller';
import { db } from '../src/dbs/init.mysql.js';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('nodemailer');
jest.mock('../src/dbs/init.mysql.js');

const app = express();
app.use(express.json());

app.post('/api/register', register);
app.post('/api/login', login);
app.post('/api/requestPasswordReset', requestPasswordReset);
app.post('/api/resetPassword', resetPassword);
app.post('/api/updatePassword', updatePassword);

describe('Auth Controller', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(10000, () => {
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

    describe('register', () => {
        it('should create a new user', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, []);
                } else if (query.includes('INSERT')) {
                    return callback(null, { insertId: 1 });
                }
            });

            bcrypt.genSaltSync.mockReturnValue('salt');
            bcrypt.hashSync.mockReturnValue('hashedPassword');

            const response = await supertest(app)
                .post('/api/register')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                    fullName: 'Test User',
                })
                .expect(200);

            expect(response.body).toHaveProperty(
                'message',
                'User has been created successfully',
            );
        });

        it('should return 409 if user already exists', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, [{}]);
                }
            });

            const response = await supertest(app)
                .post('/api/register')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                    fullName: 'Test User',
                })
                .expect(409);

            expect(response.body).toHaveProperty(
                'message',
                'User already exists',
            );
        });
    });

    describe('login', () => {
        it('should login the user and return a token', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, [
                        {
                            userId: 1,
                            email: 'test@example.com',
                            password: 'hashedPassword',
                        },
                    ]);
                }
            });

            bcrypt.compareSync.mockReturnValue(true);
            jwt.sign.mockReturnValue('token');

            const response = await supertest(app)
                .post('/api/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                })
                .expect(200);

            expect(response.body).toHaveProperty('accessToken', 'token');
            expect(response.body).toHaveProperty('email', 'test@example.com');
            expect(response.body).toHaveProperty('userId', 1);
        });

        it('should return 404 if user is not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, []);
                }
            });

            const response = await supertest(app)
                .post('/api/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                })
                .expect(404);

            expect(response.body).toHaveProperty('message', 'User not found');
        });

        it('should return 400 if password is incorrect', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, [
                        {
                            userId: 1,
                            email: 'test@example.com',
                            password: 'hashedPassword',
                        },
                    ]);
                }
            });

            bcrypt.compareSync.mockReturnValue(false);

            const response = await supertest(app)
                .post('/api/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword',
                })
                .expect(400);

            expect(response.body).toBe('Wrong password!');
        });
    });

    describe('requestPasswordReset', () => {
        it('should send password reset email', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, [
                        {
                            userId: 1,
                            email: 'test@example.com',
                            fullName: 'Test User',
                        },
                    ]);
                } else if (query.includes('UPDATE')) {
                    return callback(null, { affectedRows: 1 });
                }
            });

            jwt.sign.mockReturnValue('resetToken');

            const sendMailMock = jest.fn().mockResolvedValue();
            nodemailer.createTransport.mockReturnValue({
                sendMail: sendMailMock,
            });

            const response = await supertest(app)
                .post('/api/requestPasswordReset')
                .send({
                    email: 'test@example.com',
                })
                .expect(200);

            expect(response.body).toBe(
                'Password reset instructions sent to test@example.com',
            );
            expect(sendMailMock).toHaveBeenCalled();
        });

        it('should return 404 if user is not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, []);
                }
            });

            const response = await supertest(app)
                .post('/api/requestPasswordReset')
                .send({
                    email: 'nonexistent@example.com',
                })
                .expect(404);

            expect(response.body).toBe('User not found!');
        });
    });

    describe('resetPassword', () => {
        it('should reset the user password', async () => {
            jwt.verify.mockImplementation((token, secret, callback) => {
                callback(null, { id: 1 });
            });

            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, [
                        {
                            userId: 1,
                            resetPasswordToken: 'resetToken',
                            resetPasswordExpires: new Date(
                                Date.now() + 3600000,
                            ),
                        },
                    ]);
                } else if (query.includes('UPDATE')) {
                    return callback(null, { affectedRows: 1 });
                }
            });

            bcrypt.genSaltSync.mockReturnValue('salt');
            bcrypt.hashSync.mockReturnValue('newHashedPassword');

            const response = await supertest(app)
                .post('/api/resetPassword')
                .send({
                    token: 'resetToken',
                    newPassword: 'newpassword123',
                })
                .expect(200);

            expect(response.body).toBe('Password has been reset successfully');
        });

        it('should return 400 for invalid or expired token', async () => {
            jwt.verify.mockImplementation((token, secret, callback) => {
                callback(new Error('Invalid token'), null);
            });

            const response = await supertest(app)
                .post('/api/resetPassword')
                .send({
                    token: 'invalidToken',
                    newPassword: 'newpassword123',
                })
                .expect(400);

            expect(response.body).toBe('Invalid or expired token');
        });
    });

    describe('updatePassword', () => {
        it('should update the user password', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, [
                        {
                            password: 'hashedPassword',
                        },
                    ]);
                } else if (query.includes('UPDATE')) {
                    return callback(null, { affectedRows: 1 });
                }
            });

            bcrypt.compare.mockImplementation(
                (currentPassword, hashedPassword, callback) => {
                    callback(null, true);
                },
            );

            bcrypt.genSaltSync.mockReturnValue('salt');
            bcrypt.hashSync.mockReturnValue('newHashedPassword');

            const response = await supertest(app)
                .post('/api/updatePassword')
                .send({
                    userId: 1,
                    currentPassword: 'password123',
                    newPassword: 'newpassword123',
                })
                .expect(200);

            expect(response.body).toBe('Password updated successfully');
        });

        it('should return 401 if current password is incorrect', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, [
                        {
                            password: 'hashedPassword',
                        },
                    ]);
                }
            });

            bcrypt.compare.mockImplementation(
                (currentPassword, hashedPassword, callback) => {
                    callback(null, false);
                },
            );

            const response = await supertest(app)
                .post('/api/updatePassword')
                .send({
                    userId: 1,
                    currentPassword: 'wrongpassword',
                    newPassword: 'newpassword123',
                })
                .expect(401);

            expect(response.body).toBe('Current password is incorrect');
        });

        it('should return 404 if user is not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, []);
                }
            });

            const response = await supertest(app)
                .post('/api/updatePassword')
                .send({
                    userId: 1,
                    currentPassword: 'password123',
                    newPassword: 'newpassword123',
                })
                .expect(404);

            expect(response.body).toBe('User not found');
        });
    });
});
