// article.routes.js

import express from 'express';
import {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    getUserArticles,
} from '../controllers/article.controller.js';

const router = express.Router();

router.post('/createArticle', createArticle);
router.get('/', getArticles);
router.get('/article/:id', getArticleById);
router.put('/:articleId', updateArticle);
router.delete('/:articleId', deleteArticle);
router.get('/user/:userId', getUserArticles);

export default router;
