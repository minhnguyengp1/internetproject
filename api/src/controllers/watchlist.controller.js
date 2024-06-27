import db from '../dbs/init.mysql.js'
import { fetchImageUrls } from '../utils/helpers.js'

export const addToWatchlist = (req, res) => {
    const { userId, articleId } = req.body

    const q = `INSERT INTO watchlist (userId, articleId)
               VALUES (?, ?) ON DUPLICATE KEY
    UPDATE userId=userId`

    db.query(q, [userId, articleId], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).json({ message: 'Article added to watchlist' })
    })
}

export const removeFromWatchlist = (req, res) => {
    const { userId, articleId } = req.body

    const q = `DELETE
               FROM watchlist
               WHERE userId = ?
                 AND articleId = ?`

    db.query(q, [userId, articleId], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).json({ message: 'Article removed from watchlist' })
    })
}

export const getUserWatchlist = async (req, res) => {
    const userId = req.params.userId

    const query = `SELECT *
                   FROM articles a
                            JOIN watchlist w ON a.articleId = w.articleId
                   WHERE w.userId = ?`

    db.query(query, [userId], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' })
        }

        try {
            const articlesWithUrls = await Promise.all(results.map(async (article) => {
                try {
                    const imgUrls = await fetchImageUrls(article.imgUrls)
                    return { ...article, imgUrls }
                } catch (error) {
                    return { ...article, imgUrls: [] }
                }
            }))

            return res.status(200).json(articlesWithUrls)
        } catch (error) {
            return res.status(500).json({ error: 'Error processing articles' })
        }
    })
}