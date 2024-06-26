import supertest from 'supertest';
import express from 'express';
import {
    createMessage,
    getMessagesByConversationId,
} from '../src/controllers/message.controller';
import db from '../src/dbs/init.mysql.js';

jest.mock('../src/dbs/init.mysql.js');

const app = express();
app.use(express.json());

app.post('/api/messages', createMessage);
app.get('/api/messages/:conversationId', getMessagesByConversationId);

describe('Messages Controller', () => {
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

    describe('createMessage', () => {
        // it('should create a new message', async () => {
        //     db.query.mockImplementation((query, values, callback) => {
        //         callback(null, { insertId: 1 });
        //     });

        //     const response = await supertest(app)
        //         .post('/api/messages')
        //         .send({
        //             conversationId: 1,
        //             senderId: 1,
        //             text: 'Hello, this is a test message',
        //         })
        //         .expect(201);

        //     expect(response.body).toHaveProperty('id', 1);
        //     expect(response.body).toHaveProperty('conversationId', 1);
        //     expect(response.body).toHaveProperty('senderId', 1);
        //     expect(response.body).toHaveProperty(
        //         'text',
        //         'Hello, this is a test message',
        //     );
        // });

        it('should return 500 if there is a database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(new Error('Database error'), null);
            });

            const response = await supertest(app)
                .post('/api/messages')
                .send({
                    conversationId: 1,
                    senderId: 1,
                    text: 'Hello, this is a test message',
                })
                .expect(500);

            expect(response.body).toHaveProperty(
                'error',
                'Internal server error',
            );
        });
    });

    describe('getMessagesByConversationId', () => {
        // it('should get messages by conversation ID', async () => {
        //     const mockMessages = [
        //         { id: 1, conversationId: 1, senderId: 1, text: 'Message 1' },
        //         { id: 2, conversationId: 1, senderId: 2, text: 'Message 2' },
        //     ];

        //     db.query.mockImplementation((query, values, callback) => {
        //         callback(null, mockMessages);
        //     });

        //     const response = await supertest(app)
        //         .get('/api/messages/1')
        //         .expect(200);

        //     expect(response.body).toEqual(mockMessages);
        // });

        it('should return 500 if there is a database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                callback(new Error('Database error'), null);
            });

            const response = await supertest(app)
                .get('/api/messages/1')
                .expect(500);

            expect(response.body).toHaveProperty(
                'error',
                'Internal server error',
            );
        });
    });
});
