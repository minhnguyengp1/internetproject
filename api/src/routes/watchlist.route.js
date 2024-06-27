import express from 'express'
import {
    addToWatchlist,
    removeFromWatchlist,
    getUserWatchlist
} from '../controllers/watchlist.controller.js'

const router = express.Router()

router.post('/add', addToWatchlist)
router.post('/remove', removeFromWatchlist)
router.get('/:userId', getUserWatchlist)

export default router
