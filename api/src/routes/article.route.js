import express from 'express';
import {
    createArticle,
    getArticleById,
} from '../controllers/article.controller.js';

const router = express.Router();

router.post('/createArticle', createArticle);
router.get('/article/:id', getArticleById);

export default router;
