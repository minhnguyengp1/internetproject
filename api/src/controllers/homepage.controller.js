import { db } from '../dbs/init.mysql.js';

export const getAllArticles = (req, res) => {
    const query = 'SELECT * FROM articles';

    db.query(query, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};

export const getAllArticlesByCategory = (req, res) => {
    const { category } = req.query;
    if (!category) {
        return req
            .status(400)
            .json({ message: 'Missing required parameter: category' }, err);
    }

    const query = 'SELECT * FROM articles WHERE category = ?';
    db.query(query, [category], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};
