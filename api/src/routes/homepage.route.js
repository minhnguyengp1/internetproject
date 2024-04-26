import express from 'express';
import {
    getAllArticles,
    getAllArticlesByCategory,
} from '../controllers/homepage.controller.js';

const router = express.Router();

router.get('/api/allArticles', getAllArticles);
router.get('/api/allArticles/:category', getAllArticlesByCategory);

export default router;
