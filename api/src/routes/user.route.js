import express from 'express'
import { getUser, getUserArticles, updateUser } from '../controllers/user.controller.js'
import { getUserFollowers } from '../controllers/follower.controller.js'

const router = express.Router()

router.get('/:userId', getUser)
// router.post('/', addUser);
// router.delete('/:userId', deleteUser);
router.put('/:userId', updateUser)
router.get('/:userId/articles', getUserArticles)
router.get('/:userId/followers', getUserFollowers)

export default router
