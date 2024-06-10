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

// GET: http://localhost:5000/api/articles?search=query
export const getArticles = (req, res) => {
    const { search } = req.query

    let q = 'SELECT * FROM articles'

    if (search) {
        // Adjust the query to search based on title, description, or category
        q += ` WHERE title LIKE '%${search}%' OR description LIKE '%${search}%' OR category LIKE '%${search}%'`
    }

    db.query(q, (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }

        return res.status(200).json(data)
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

export const getUserArticles = (req, res) => {
    const userId = req.params.userId // Assuming userId is passed in the URL

    const q = 'SELECT * FROM articles WHERE userId = ?'

    db.query(q, [userId], (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }

        return res.status(200).json(data)
    })
}
