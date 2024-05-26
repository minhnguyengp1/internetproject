import express from 'express';
import {
    getUser,
    // addUser,
    // deleteUser,
    // updateUser,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/:userId', getUser);
// router.post('/', addUser);
// router.delete('/:userId', deleteUser);
// router.put('/:userId', updateUser);

export default router;
