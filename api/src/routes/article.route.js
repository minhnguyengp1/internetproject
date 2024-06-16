import express from 'express'
import {
    createArticle,
    searchArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    getAllArticles
} from '../controllers/article.controller.js'

const router = express.Router()

router.post('/', createArticle)
router.get('/', getAllArticles)
router.get('/:articleId', getArticleById)
router.put('/:articleId', updateArticle)
router.delete('/:articleId', deleteArticle)

router.get('/search', searchArticles)

export default router
