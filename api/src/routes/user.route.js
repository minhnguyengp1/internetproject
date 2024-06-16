import express from 'express'
import { getUser, getUserArticles, updateUser } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/:userId', getUser)
// router.post('/', addUser);
// router.delete('/:userId', deleteUser);
router.put('/:userId', updateUser)
router.get('/:userId/articles', getUserArticles)


export default router
