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

router.get('/search/', searchArticles)

router.post('/', createArticle)
router.get('/', getAllArticles)
router.get('/:articleId', getArticleById)
router.put('/:articleId', updateArticle)
router.delete('/:articleId', deleteArticle)

export default router
