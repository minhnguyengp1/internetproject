import { db } from '../dbs/init.mysql.js';

export const createArticle = (req, res) => {
    // Extract article details from the request body
    console.log(req.body);
    const { title, description, price, type, category, userId, imgUrl } =
        req.body;
    if (
        !title ||
        !description ||
        !price ||
        !type ||
        !category ||
        !userId ||
        !imgUrl
    ) {
        return req
            .status(400)
            .json({ message: 'Missing required parameter: category' }, err);
    }
    // Construct the SQL query for inserting data
    const query =
        'INSERT INTO articles (userId , description, price, title, type,  imgUrl, category) VALUES (?, ?, ?, ?, ?, ?, ?);';

    // Execute the query with the provided article details
    db.query(
        query,
        [userId, description, price, title, type, imgUrl, category],
        (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            // If the article is created successfully, send a 201 status code with the created article data
            // Depending on your DB setup, data may contain different information.
            // You might need to adjust the response according to what your data returns.
            res.status(201).json({
                message: 'New article created successfully',
                // Assuming data has insertId which is typical for SQL insert operations
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
