import express from 'express';
import {
    getUser,
    getUserArticles,
    // addUser,
    // deleteUser,
    // updateUser,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/:userId', getUser);
router.get('/:userId/articles', getUserArticles);
// router.post('/', addUser);
// router.delete('/:userId', deleteUser);
// router.put('/:userId', updateUser);

export default router;
