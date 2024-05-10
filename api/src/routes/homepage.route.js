import express from 'express';
import {
    getAllArticles,
    getAllArticlesByCategory,
    searchArticles,
} from '../controllers/homepage.controller.js';

const router = express.Router();

router.get('/api/allArticles', getAllArticles);
router.get('/api/allArticles/:category', getAllArticlesByCategory);
router.get('/api/search', searchArticles);

export default router;
