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

// Route to create a new review
router.post('/', createReview)

// Route to get all reviews
router.get('/', getReviews)

// Route to get a review by ID
router.get('/:reviewId', getReviewById)

// Route to update a review by ID
router.put('/:reviewId', updateReview)

// Route to delete a review by ID
router.delete('/:reviewId', deleteReview)

// Route to get reviews by a specific author
router.get('/author/:authorId', getReviewsByAuthor)

// Route to get reviews about a specific subject
router.get('/subject/:subjectId', getReviewsBySubject)

export default router
