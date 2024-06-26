import express from 'express'
import { deleteUser, getUser, getUserArticles, updateUser } from '../controllers/user.controller.js'
import {
    followUser,
    getUserFollowers,
    getUserFollowing,
    removeFollower,
    unfollowUser
} from '../controllers/follower.controller.js'

const router = express.Router()

router.get('/:userId', getUser)
router.delete('/:userId', deleteUser)
router.put('/:userId', updateUser)
router.get('/:userId/articles', getUserArticles)
router.get('/:userId/followers', getUserFollowers)
router.get('/:userId/following', getUserFollowing)

router.put('/:userId/follow/:strangerId', followUser)
router.delete('/:userId/follow/:strangerId', unfollowUser)

router.delete('/remove/:strangerId', removeFollower)

export default router
