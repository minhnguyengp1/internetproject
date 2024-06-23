import express from 'express'
import {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getReviewsByAuthor,
    getReviewsBySubject
} from '../controllers/review.controller.js'

const router = express.Router()

router.post('/', createReview)
router.get('/', getReviews)
router.get('/:reviewId', getReviewById)
router.put('/:reviewId', updateReview)
router.delete('/:reviewId', deleteReview)
router.get('/author/:authorId', getReviewsByAuthor)
router.get('/subject/:subjectId', getReviewsBySubject)

export default router
