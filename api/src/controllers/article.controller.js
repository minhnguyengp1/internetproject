import { db } from '../dbs/init.mysql.js'
import { uploadFile } from '../services/azureStorageService.js'
import { fetchImageUrls } from '../utils/helpers.js'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() }).array('uploads', 5)

export const getAllArticles = (req, res) => {
    const { category } = req.query
    let query = 'SELECT * FROM articles'

    if (category) {
        query = `SELECT *
                 FROM articles
                 WHERE category = ?`
    }

    db.query(query, [category], async (err, articles) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' })
        }

        try {
            const articlesWithUrls = await Promise.all(articles.map(async (article) => {
                try {
                    const imgUrls = await fetchImageUrls(article.imgUrls)
                    return { ...article, imgUrls }
                } catch (error) {
                    console.error('Error fetching image URLs:', error)
                    return { ...article, imgUrls: [] }
                }
            }))

            return res.status(200).json(articlesWithUrls)
        } catch (error) {
            console.error('Error processing articles:', error)
            return res.status(500).json({ error: 'Error processing articles' })
        }
    })
}

export const searchArticles = (req, res) => {
    let searchQuery = req.query.search
    const category = req.params.category

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

    db.query(query, values, async (err, results) => {
        if (err) {
            console.error('Error executing search query:', err)
            return res.status(500).json({ error: 'Internal server error' })
        }

        try {
            const resultsWithFiles = await Promise.all(results.map(async (article) => {
                try {
                    const imgUrls = await fetchImageUrls(article.imgUrls)
                    return { ...article, imgUrls }
                } catch (error) {
                    console.error('Error fetching image URLs:', error)
                    return { ...article, imgUrls: [] }
                }
            }))

            return res.json(resultsWithFiles)
        } catch (error) {
            console.error('Error processing search results:', error)
            return res.status(500).json({ error: 'Error processing search results' })
        }
    })
}

// POST: http://localhost:5000/api/articles
export const createArticle = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log('Error uploading files:', err)
            return res.status(500).json({ message: 'File upload failed', error: err.message })
        }

        const { category, description, price, title, userId, type, postalCode, city } = req.body
        const files = req.files

        try {
            const imgUrls = await Promise.all(files.map(file => uploadFile(file)))

            const query = 'INSERT INTO articles (category, description, imgUrls, price, title, userId, type, postalCode, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
            db.query(
                query,
                [category, description, imgUrls.join(','), price, title, userId, type, postalCode, city],
                (err, result) => {
                    if (err) {
                        console.error('Error creating article:', err)
                        return res.status(500).json({ message: 'Database query failed', error: err })
                    }

                    return res.status(201).json({
                        message: 'Article created successfully',
                        articleId: result.insertId
                    })
                }
            )
        } catch (error) {
            return res.status(500).json({ message: 'Error processing files', error })
        }
    })
}

// GET: http://localhost:5000/api/articles/${articleId}
export const getArticleById = (req, res) => {
    const articleId = req.params.articleId

    const q = 'SELECT * FROM articles WHERE articleId = ?'

    db.query(q, [articleId], async (err, articles) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (articles.length === 0) {
            return res.status(404).json({ message: 'Article not found' })
        }

        try {
            const articleData = {
                ...articles[0]
            }

            try {
                const imgUrls = await fetchImageUrls(articles[0].imgUrls)

                articleData.imgUrls = imgUrls
            } catch (error) {
                console.error('Error fetching image URLs:', error)
                articleData.imgUrls = []
            }

            return res.status(200).json(articleData)
        } catch (error) {
            console.error('Error fetching article data:', error)
            return res.status(500).json({ error: 'Error fetching article data' })
        }
    })
}

// PUT: http://localhost:5000/api/articles/${articleId}
export const updateArticle = (req, res) => {
    const articleId = req.params.articleId
    const { category, description, imgUrls, price, title, type } = req.body

    const q =
        'UPDATE articles SET category = ?, description = ?, imgUrls = ?, price = ?, title = ?, type = ? WHERE articleId = ?'

    db.query(
        q,
        [category, description, imgUrls, price, title, type, articleId],
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
