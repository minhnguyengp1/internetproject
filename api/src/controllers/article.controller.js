import { db } from '../dbs/init.mysql.js';

export const createArticle = (req, res) => {
    console.log(req.body);
    const { title, description, price, type, category } = req.body;
    const userId = 1;
    const imgUrl = '';
    if (
        !title ||
        !description ||
        !price ||
        !type ||
        !category
        //!userId ||
        //!imgUrl
    ) {
        return res.status(400).json({ message: 'Missing required parameter' });
    }
    const query =
        'INSERT INTO articles (userId , description, price, title, type,  imgUrl, category) VALUES (?, ?, ?, ?, ?, ?, ?);';

    db.query(
        query,
        [userId, description, price, title, type, imgUrl, category],
        (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).json({
                message: 'New article created successfully',
                userIdId: title,
                description,
                price,
                type,
                category,
                imgUrl,
            });
        },
    );
};

export const getArticleById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM articles WHERE articleId = ?';

    db.query(query, [id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(data[0]);
    });
};
