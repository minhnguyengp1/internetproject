import express from 'express'
import { login, register, requestPasswordReset, resetPassword, updatePassword } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/request-password-reset', requestPasswordReset)
router.post('/reset-password', resetPassword)
router.put('/update-password', updatePassword)

export default router
