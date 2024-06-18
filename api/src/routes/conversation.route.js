import express from 'express'
import {
    createConversation,
    getConversationsByUserId,
    getConversationBetweenUsers
} from '../controllers/conversation.controller.js'

const router = express.Router()

router.post('/', createConversation)
router.get('/:userId', getConversationsByUserId)
router.get('/find/:firstUserId/:secondUserId', getConversationBetweenUsers)

export default router