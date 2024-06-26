import supertest from 'supertest';
import express from 'express';
import {
    createConversation,
    getConversationsByUserId,
    getConversationBetweenUsers,
} from '../src/controllers/conversation.controller';
import db from '../src/dbs/init.mysql.js';

jest.mock('../src/dbs/init.mysql.js');

const app = express();
app.use(express.json());

app.post('/api/conversations', createConversation);
app.get('/api/conversations/:userId', getConversationsByUserId);
app.get(
    '/api/conversations/find/:firstUserId/:secondUserId',
    getConversationBetweenUsers,
);

describe('Conversations Controller', () => {
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

    describe('createConversation', () => {
        it('should create a new conversation', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('INSERT')) {
                    return callback(null, { insertId: 1 });
                }
            });

            const response = await supertest(app)
                .post('/api/conversations')
                .send({
                    senderId: 1,
                    receiverId: 2,
                })
                .expect(201);

            expect(response.body).toHaveProperty('id', 1);
            expect(response.body).toHaveProperty('senderId', 1);
            expect(response.body).toHaveProperty('receiverId', 2);
        });

        it('should return 500 if there is a database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('INSERT')) {
                    return callback(new Error('Database error'), null);
                }
            });

            const response = await supertest(app)
                .post('/api/conversations')
                .send({
                    senderId: 1,
                    receiverId: 2,
                })
                .expect(500);

            expect(response.body).toHaveProperty(
                'error',
                'Internal server error',
            );
        });
    });

    describe('getConversationsByUserId', () => {
        it('should get conversations for a user', async () => {
            const mockConversations = [
                { id: 1, senderId: 1, receiverId: 2 },
                { id: 2, senderId: 2, receiverId: 1 },
            ];

            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, mockConversations);
                }
            });

            const response = await supertest(app)
                .get('/api/conversations/1')
                .expect(200);

            expect(response.body).toEqual(mockConversations);
        });

        it('should return 500 if there is a database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(new Error('Database error'), null);
                }
            });

            const response = await supertest(app)
                .get('/api/conversations/1')
                .expect(500);

            expect(response.body).toHaveProperty(
                'error',
                'Internal server error',
            );
        });
    });

    describe('getConversationBetweenUsers', () => {
        it('should get a conversation between two users', async () => {
            const mockConversation = { id: 1, senderId: 1, receiverId: 2 };

            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, [mockConversation]);
                }
            });

            const response = await supertest(app)
                .get('/api/conversations/find/1/2')
                .expect(200);

            expect(response.body).toEqual(mockConversation);
        });

        it('should return 404 if conversation is not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(null, []);
                }
            });

            const response = await supertest(app)
                .get('/api/conversations/find/1/2')
                .expect(404);

            expect(response.body).toHaveProperty(
                'error',
                'Conversation not found',
            );
        });

        it('should return 500 if there is a database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('SELECT')) {
                    return callback(new Error('Database error'), null);
                }
            });

            const response = await supertest(app)
                .get('/api/conversations/find/1/2')
                .expect(500);

            expect(response.body).toHaveProperty(
                'error',
                'Internal server error',
            );
        });
    });
}, 30000); // Set the timeout to 30 seconds for this test suite
