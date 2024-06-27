import supertest from 'supertest'
import express from 'express'
import {
    getAllArticles,
    searchArticles,
    createArticle,
    getArticleById,
    updateArticle,
    deleteArticle
} from '../src/controllers/article.controller'
import { db } from '../src/dbs/init.mysql.js'
import multer from 'multer'

jest.mock('../src/dbs/init.mysql.js')
jest.mock('../src/services/azureStorageService.js')
jest.mock('../src/utils/helpers.js')

const app = express()
app.use(express.json())
const upload = multer({ storage: multer.memoryStorage() }).array('uploads', 5)

app.get('/api/articles', getAllArticles)
app.get('/api/articles/search', searchArticles)
app.post('/api/articles', upload, createArticle)
app.get('/api/articles/:articleId', getArticleById)
app.put('/api/articles/:articleId', upload, updateArticle)
app.delete('/api/articles/:articleId', deleteArticle)

describe('Articles Controller', () => {
    let server

    beforeAll((done) => {
        server = app.listen(5000, () => {
            done()
        })
    })

    afterAll((done) => {
        server.close(() => {
            done()
        })
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('getAllArticles', () => {

        it('should return 500 if there is a database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                return callback(new Error('Database error'), null)
            })

            const response = await supertest(app)
                .get('/api/articles')
                .expect(500)

            expect(response.body).toHaveProperty('error', 'Internal server error')
        })
    })

    describe('searchArticles', () => {

        it('should return 500 if there is a database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                return callback(new Error('Database error'), null)
            })

            const response = await supertest(app)
                .get('/api/articles/search?search=Test')
                .expect(500)

            expect(response.body).toHaveProperty('error', 'Internal server error')
        })
    })

    describe('createArticle', () => {
        it('should create a new article', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('INSERT')) {
                    return callback(null, { insertId: 1 })
                }
            })

            const response = await supertest(app)
                .post('/api/articles')
                .send({
                    category: 'Test Category',
                    description: 'Test Description',
                    price: 100,
                    title: 'Test Title',
                    userId: 1,
                    type: 'Test Type',
                    city: 'Test City'
                })
                .expect(201)

            expect(response.body).toHaveProperty('message', 'Article created successfully')
            expect(response.body).toHaveProperty('articleId', 1)
        })

        it('should return 500 if there is a database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('INSERT')) {
                    return callback(new Error('Database error'), null)
                }
            })

            const response = await supertest(app)
                .post('/api/articles')
                .send({
                    category: 'Test Category',
                    description: 'Test Description',
                    price: 100,
                    title: 'Test Title',
                    userId: 1,
                    type: 'Test Type',
                    city: 'Test City'
                })
                .expect(500)

            expect(response.body).toHaveProperty('message', 'Database query failed')
        })
    })

    describe('getArticleById', () => {
        it('should return 404 if the article is not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                return callback(null, [])
            })

            const response = await supertest(app)
                .get('/api/articles/1')
                .expect(404)

            expect(response.body).toHaveProperty('message', 'Article not found')
        })
    })

    describe('updateArticle', () => {
        it('should update an article', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('UPDATE')) {
                    return callback(null, { affectedRows: 1 })
                }
            })

            const response = await supertest(app)
                .put('/api/articles/1')
                .send({
                    category: 'Updated Category',
                    description: 'Updated Description',
                    price: 200,
                    title: 'Updated Title',
                    type: 'Updated Type',
                    city: 'Updated City'
                })
                .expect(200)

            expect(response.body).toHaveProperty('message', 'Article updated successfully')
        })

        it('should return 404 if the article is not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('UPDATE')) {
                    return callback(null, { affectedRows: 0 })
                }
            })

            const response = await supertest(app)
                .put('/api/articles/1')
                .send({
                    category: 'Updated Category',
                    description: 'Updated Description',
                    price: 200,
                    title: 'Updated Title',
                    type: 'Updated Type',
                    city: 'Updated City'
                })
                .expect(404)

            expect(response.body).toHaveProperty('message', 'Article not found')
        })

        it('should return 500 if there is a database error', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('UPDATE')) {
                    return callback(new Error('Database error'), null)
                }
            })

            const response = await supertest(app)
                .put('/api/articles/1')
                .send({
                    category: 'Updated Category',
                    description: 'Updated Description',
                    price: 200,
                    title: 'Updated Title',
                    type: 'Updated Type',
                    city: 'Updated City'
                })
                .expect(500)

            expect(response.body).toHaveProperty('message', 'Database query failed')
        })
    })

    describe('deleteArticle', () => {
        it('should delete an article', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('DELETE')) {
                    return callback(null, { affectedRows: 1 })
                }
            })

            const response = await supertest(app)
                .delete('/api/articles/1')
                .expect(200)

            expect(response.body).toHaveProperty('message', 'Article deleted successfully')
        })

        it('should return 404 if the article is not found', async () => {
            db.query.mockImplementation((query, values, callback) => {
                if (query.includes('DELETE')) {
                    return callback(null, { affectedRows: 0 })
                }
            })

            const response = await supertest(app)
                .delete('/api/articles/1')
                .expect(404)

            expect(response.body).toHaveProperty('message', 'Article not found')
        })
    })
}, 30000)
