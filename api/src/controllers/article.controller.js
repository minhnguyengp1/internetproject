import { db } from '../dbs/init.mysql.js'

export const createArticle = (req, res) => {
    const { category, description, imgUrl, price, title, userId, type } =
        req.body

    const q =
        'INSERT INTO articles (category, description, imgUrl, price, title, userId, type) VALUES (?, ?, ?, ?, ?, ?, ?)'

    db.query(
        q,
        [category, description, imgUrl, price, title, userId, type],
        (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            return res.status(201).json({
                message: 'Article created successfully',
                articleId: result.insertId
            })
        }
    )
}

export const getArticles = (req, res) => {
    let searchQuery = req.query.search
    const category = req.params.category

    console.log('req.query: ', req.query)
    console.log('searchQuery: ', searchQuery)

    if (!searchQuery) {
        return res.status(400).json({ error: 'Search query is required' })
    }

    const searchTerms = searchQuery.split(' ')

    const placeholders = searchTerms.map(() => `(title LIKE ? OR description LIKE ? OR category LIKE ?)`).join(' OR ')

    const values = searchTerms.flatMap(term => [`%${term}%`, `%${term}%`, `%${category}%`])

    const query = `
        SELECT *
        FROM articles
        WHERE ${placeholders}
    `

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing search query:', err)
            return res.status(500).json({ error: 'Internal server error' })
        }

        res.json(results)
    })
}

// GET: http://localhost:5000/api/articles/${articleId}
export const getArticleById = (req, res) => {
    const articleId = req.params.articleId

    const q = 'SELECT * FROM articles WHERE articleId = ?'

    db.query(q, [articleId], (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'Article not found' })
        }

        return res.status(200).json(data[0])
    })
}

// PUT: http://localhost:5000/api/articles/${articleId}
export const updateArticle = (req, res) => {
    const articleId = req.params.articleId
    const { category, description, imgUrl, price, title, type } = req.body

    const q =
        'UPDATE articles SET category = ?, description = ?, imgUrl = ?, price = ?, title = ?, type = ? WHERE articleId = ?'

    db.query(
        q,
        [category, description, imgUrl, price, title, type, articleId],
        (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Article not found' })
            }

            return res
                .status(200)
                .json({ message: 'Article updated successfully' })
        }
    )
}

// DELETE: http://localhost:5000/api/articles/${articleId}
export const deleteArticle = (req, res) => {
    const articleId = req.params.articleId

    const q = 'DELETE FROM articles WHERE articleId = ?'

    db.query(q, [articleId], (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Article not found' })
        }

        return res
            .status(200)
            .json({ message: 'Article deleted successfully' })
    })
}
