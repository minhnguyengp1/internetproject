import { db } from '../dbs/init.mysql.js'
import { getBlobUrl } from '../services/azureStorageService.js'

export const createReview = (req, res) => {
    const { authorId, subjectId, text, rating } = req.body

    const q = `
        INSERT INTO reviews (authorId, subjectId, text, rating)
        VALUES (?, ?, ?, ?)
    `

    db.query(q, [authorId, subjectId, text, rating], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        return res.status(201).json({
            message: 'Review created successfully',
            reviewId: result.insertId
        })
    })
}

export const getReviews = (req, res) => {
    const q = 'SELECT * FROM reviews'

    db.query(q, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        return res.status(200).json(results)
    })
}

export const getReviewById = (req, res) => {
    const { reviewId } = req.params

    const q = 'SELECT * FROM reviews WHERE reviewId = ?'

    db.query(q, [reviewId], (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Review not found' })
        }

        return res.status(200).json(results[0])
    })
}

export const updateReview = (req, res) => {
    const { reviewId } = req.params
    const { text, rating } = req.body

    const q = `
        UPDATE reviews
        SET text   = ?,
            rating = ?
        WHERE reviewId = ?
    `

    db.query(q, [text, rating, reviewId], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Review not found' })
        }

        return res.status(200).json({ message: 'Review updated successfully' })
    })
}

export const deleteReview = (req, res) => {
    const { reviewId } = req.params

    const q = 'DELETE FROM reviews WHERE reviewId = ?'

    db.query(q, [reviewId], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Review not found' })
        }

        return res.status(200).json({ message: 'Review deleted successfully' })
    })
}

export const getReviewsByAuthor = (req, res) => {
    const { authorId } = req.params

    const q = 'SELECT * FROM reviews WHERE authorId = ?'

    db.query(q, [authorId], (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }

        return res.status(200).json(results)
    })
}

export const getReviewsBySubject = (req, res) => {
    const { subjectId } = req.params

    if (!subjectId || isNaN(subjectId)) {
        return res.status(400).json({ message: 'Invalid subjectId' })
    }

    const q = `
        SELECT r.*, u.fullName AS authorName, u.img AS authorImg
        FROM reviews r
                 JOIN users u ON r.authorId = u.userId
        WHERE r.subjectId = ?
    `

    db.query(q, [subjectId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching reviews', error: err })
        }

        const reviewsWithImgUrl = results.map(review => ({
            ...review,
            authorImg: getBlobUrl(review.authorImg)
        }))

        return res.status(200).json(reviewsWithImgUrl)
    })
}