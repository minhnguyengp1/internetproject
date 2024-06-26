import { db } from '../dbs/init.mysql.js';
import { uploadFile } from '../services/azureStorageService.js';
import { fetchImageUrls } from '../utils/helpers.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() }).array('uploads', 5);

export const getAllArticles = (req, res) => {
    const { category } = req.query;
    let query = 'SELECT * FROM articles';

    if (category) {
        query = `SELECT *
                 FROM articles
                 WHERE category = ?`;
    }

    db.query(query, [category], async (err, articles) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        try {
            const articlesWithUrls = await Promise.all(
                articles.map(async (article) => {
                    try {
                        const imgUrls = await fetchImageUrls(article.imgUrls);
                        return { ...article, imgUrls };
                    } catch (error) {
                        console.error('Error fetching image URLs:', error);
                        return { ...article, imgUrls: [] };
                    }
                }),
            );

            return res.status(200).json(articlesWithUrls);
        } catch (error) {
            console.error('Error processing articles:', error);
            return res.status(500).json({ error: 'Error processing articles' });
        }
    });
};

export const searchArticles = (req, res) => {
    const {
        category,
        search: searchQuery,
        minPrice,
        maxPrice,
        city,
    } = req.query;

    let searchConditions = [];
    let values = [];

    if (searchQuery) {
        const searchTerms = searchQuery.split(' ');
        const conditions = searchTerms.map(
            () => `(title LIKE ? OR description LIKE ?)`,
        );
        searchConditions.push(`(${conditions.join(' OR ')})`);
        values.push(
            ...searchTerms.flatMap((term) => [`%${term}%`, `%${term}%`]),
        );
    }

    if (category) {
        searchConditions.push('category = ?');
        values.push(category);
    }

    if (minPrice) {
        searchConditions.push('price >= ?');
        values.push(minPrice);
    }
    if (maxPrice) {
        searchConditions.push('price <= ?');
        values.push(maxPrice);
    }

    if (city) {
        searchConditions.push('city = ?');
        values.push(city);
    }

    const whereClause = searchConditions.length
        ? `WHERE ${searchConditions.join(' AND ')}`
        : '';
    const query = `
        SELECT *
        FROM articles ${whereClause}
    `;

    db.query(query, values, async (err, results) => {
        if (err) {
            console.error('Error executing search query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        try {
            const resultsWithFiles = await Promise.all(
                results.map(async (article) => {
                    try {
                        const imgUrls = await fetchImageUrls(article.imgUrls);
                        return { ...article, imgUrls };
                    } catch (error) {
                        console.error('Error fetching image URLs:', error);
                        return { ...article, imgUrls: [] };
                    }
                }),
            );

            return res.json(resultsWithFiles);
        } catch (error) {
            console.error('Error processing search results:', error);
            return res
                .status(500)
                .json({ error: 'Error processing search results' });
        }
    });
};

// POST: http://localhost:5000/api/articles
export const createArticle = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log('Error uploading files:', err);
            return res
                .status(500)
                .json({ message: 'File upload failed', error: err.message });
        }

        const { category, description, price, title, userId, type, city } =
            req.body;
        const files = req.files || []; // Handle case where no files are uploaded

        console.log('Received data:', {
            category,
            description,
            price,
            title,
            userId,
            type,
            city,
            files,
        });

        if (
            !category ||
            !description ||
            !price ||
            !title ||
            !userId ||
            !type ||
            !city
        ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        try {
            const imgUrls = await Promise.all(
                files.map((file) => uploadFile(file)),
            );

            const query =
                'INSERT INTO articles (category, description, imgUrls, price, title, userId, type, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(
                query,
                [
                    category,
                    description,
                    imgUrls.join(','),
                    price,
                    title,
                    userId,
                    type,
                    city,
                ],
                (err, result) => {
                    if (err) {
                        console.error('Error creating article:', err);
                        return res.status(500).json({
                            message: 'Database query failed',
                            error: err,
                        });
                    }

                    return res.status(201).json({
                        message: 'Article created successfully',
                        articleId: result.insertId,
                    });
                },
            );
        } catch (error) {
            return res
                .status(500)
                .json({ message: 'Error processing files', error });
        }
    });
};

// GET: http://localhost:5000/api/articles/:articleId
export const getArticleById = (req, res) => {
    const articleId = req.params.articleId;

    const q = 'SELECT * FROM articles WHERE articleId = ?';

    db.query(q, [articleId], async (err, articles) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (articles.length === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }

        try {
            const articleData = {
                ...articles[0],
            };

            try {
                const imgUrls = await fetchImageUrls(articles[0].imgUrls);

                articleData.imgUrls = imgUrls;
            } catch (error) {
                console.error('Error fetching image URLs:', error);
                articleData.imgUrls = [];
            }

            return res.status(200).json(articleData);
        } catch (error) {
            console.error('Error fetching article data:', error);
            return res
                .status(500)
                .json({ error: 'Error fetching article data' });
        }
    });
};

// PUT: http://localhost:5000/api/articles/:articleId
export const updateArticle = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading files:', err);
            return res
                .status(500)
                .json({ message: 'File upload failed', error: err.message });
        }

        const articleId = req.params.articleId;

        const { category, description, price, title, type, city } = req.body;
        let existingImgUrls = [];

        try {
            if (req.body.existingImgUrls) {
                existingImgUrls = JSON.parse(req.body.existingImgUrls).map(
                    (url) => {
                        const parts = url.split('/');
                        return parts[parts.length - 1]; // Extract the filename
                    },
                );
            }
        } catch (parseError) {
            console.error('Error parsing existingImgUrls:', parseError);
            return res
                .status(400)
                .json({ message: 'Invalid existingImgUrls format' });
        }

        const files = req.files;

        if (!category || !description || !price || !title || !type || !city) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        try {
            let newImgUrls = [];
            if (files && files.length > 0) {
                newImgUrls = await Promise.all(
                    files.map((file) => uploadFile(file)),
                );
            }

            const updatedImgUrls = [
                ...existingImgUrls,
                ...newImgUrls.map((url) => url.split('/').pop()), // Extract filename
            ]
                .filter(Boolean)
                .join(',');

            const q = `
                UPDATE articles
                SET category    = ?,
                    description = ?,
                    imgUrls     = ?,
                    price       = ?,
                    title       = ?,
                    type        = ?,
                    city        = ?
                WHERE articleId = ?
            `;

            db.query(
                q,
                [
                    category,
                    description,
                    updatedImgUrls,
                    price,
                    title,
                    type,
                    city,
                    articleId,
                ],
                (err, result) => {
                    if (err) {
                        console.error('Error updating article:', err);
                        return res.status(500).json({
                            message: 'Database query failed',
                            error: err,
                        });
                    }

                    if (result.affectedRows === 0) {
                        return res
                            .status(404)
                            .json({ message: 'Article not found' });
                    }

                    return res
                        .status(200)
                        .json({ message: 'Article updated successfully' });
                },
            );
        } catch (error) {
            console.error('Error processing update:', error);
            return res
                .status(500)
                .json({ message: 'Error processing update', error });
        }
    });
};

// DELETE: http://localhost:5000/api/articles/${articleId}
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
