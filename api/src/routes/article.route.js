import express from 'express'
import {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} from '../controllers/article.controller.js'

const router = express.Router()

router.post('/', createArticle)
router.get('/', getArticles)
router.get('/:articleId', getArticleById)
router.put('/:articleId', updateArticle)
router.delete('/:articleId', deleteArticle)

router.get('/search', getArticles)

export default router
