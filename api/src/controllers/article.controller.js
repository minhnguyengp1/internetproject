import { db } from '../dbs/init.mysql.js';

export const createArticle = (req, res) => {
    const { category, description, imgUrl, price, title, userId, type } =
        req.body;

    const q =
        'INSERT INTO articles (category, description, imgUrl, price, title, userId, type) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(
        q,
        [category, description, imgUrl, price, title, userId, type],
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            return res.status(201).json({
                message: 'Article created successfully',
                articleId: result.insertId,
            });
        },
    );
};

export const getArticles = (req, res) => {
    const q = 'SELECT * FROM articles';

    db.query(q, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }

        return res.status(200).json(data);
    });
};

export const getArticleById = (req, res) => {
    const articleId = req.params.articleId;

    const q = 'SELECT * FROM articles WHERE articleId = ?';

    db.query(q, [articleId], (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }

        return res.status(200).json(data[0]);
    });
};

export const updateArticle = (req, res) => {
    const articleId = req.params.articleId;
    const { category, description, imgUrl, price, title, type } = req.body;

    const q =
        'UPDATE articles SET category = ?, description = ?, imgUrl = ?, price = ?, title = ?, type = ? WHERE articleId = ?';

    db.query(
        q,
        [category, description, imgUrl, price, title, type, articleId],
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Article not found' });
            }

            return res
                .status(200)
                .json({ message: 'Article updated successfully' });
        },
    );
};

export const deleteArticle = (req, res) => {
    const articleId = req.params.articleId;

    const q = 'DELETE FROM articles WHERE articleId = ?';

    db.query(q, [articleId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }

        return res
            .status(200)
            .json({ message: 'Article deleted successfully' });
    });
};

export const getUserArticles = (req, res) => {
    const userId = req.params.userId; // Assuming userId is passed in the URL

    const q = 'SELECT * FROM articles WHERE userId = ?';

    db.query(q, [userId], (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }

        return res.status(200).json(data);
    });
};
