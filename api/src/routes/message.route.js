import express from 'express'
import {
    createMessage,
    getMessagesByConversationId
} from '../controllers/message.controller.js'

const router = express.Router()

router.post('/', createMessage)
router.get('/:conversationId', getMessagesByConversationId)

export default router
