import { db } from '../dbs/init.mysql.js'

export const getAllArticles = (req, res) => {
    const query = 'SELECT * FROM articles'

    db.query(query, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' })
        }
        return res.status(200).json(data)
    })
}

export const getAllArticlesByCategory = (req, res) => {
    const { category } = req.params
    if (!category) {
        return res
            .status(400)
            .json({ message: 'Missing required parameter: category' }, err)
    }

    const query = 'SELECT * FROM articles WHERE category = ?'
    db.query(query, [category], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' })
        }
        return res.status(200).json(data)
    })
}

export const searchArticles = (req, res) => {
    console.log(req.query)
    let { term } = req.query

    if (!term || typeof term !== 'string') {
        return res
            .status(400)
            .json({ message: 'No search termn provided or invalid' })
    }
    term = term.trim()
    if (term === '') {
        return res.status(400).json({ message: 'Search term is empty' })
    }
    const searchQuery =
        'SELECT * FROM articles WHERE title LIKE ? OR description LIKE ?'

    db.query(searchQuery, [`%${term}%`, `%${term}%`], (err, results) => {
        if (err) {
            return res
                .status(500)
                .json({ message: 'Database error', error: err })
        }
        res.status(200).json(results)
    })
}
