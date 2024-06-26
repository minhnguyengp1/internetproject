import { db } from '../dbs/init.mysql.js'
import { getBlobUrl, uploadFile } from '../services/azureStorageService.js'
import multer from 'multer'
import { fetchImageUrls } from '../utils/helpers.js'

const upload = multer({ storage: multer.memoryStorage() }).single('img')

// GET: /api/users/:userId
export const getUser = (req, res) => {
    const q = 'SELECT * FROM users WHERE userId = ?'

    db.query(q, [req.params.userId], (err, data) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }

        const user = data[0]

        const imageUrl = getBlobUrl(user.img)

        return res.status(200).json({
            userId: user.userId,
            fullName: user.fullName,
            email: user.email,
            street: user.street,
            city: user.city,
            postalCode: user.postalCode,
            lastActiveTimeStamp: user.lastActiveTimeStamp,
            img: imageUrl
        })
    })
}

// PUT: /api/user/:userId
export const updateUser = (req, res) => {
    upload(req, res, async (err) => {
        const { userId } = req.params
        const { fullName, street, city, postalCode } = req.body

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' })
        }

        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: 'File upload failed', error: err.message })
        } else if (err) {
            return res.status(500).json({ message: 'File upload failed', error: err })
        }

        const img = req.file

        const fields = []
        const values = []

        if (fullName) {
            fields.push('fullName = ?')
            values.push(fullName)
        }
        if (street) {
            fields.push('street = ?')
            values.push(street)
        }
        if (city) {
            fields.push('city = ?')
            values.push(city)
        }
        if (postalCode) {
            fields.push('postalCode = ?')
            values.push(postalCode)
        }
        if (img) {
            try {
                const imgUrls = await uploadFile(img) // Upload file to Azure Blob Storage

                console.log('imgUrls', imgUrls)
                fields.push('img = ?')
                values.push(imgUrls) // Assuming imgUrls is a string containing the Blob URL
            } catch (uploadErr) {
                console.error('Error uploading image:', uploadErr)
                return res.status(500).json({ message: 'Error uploading image', error: uploadErr.message })
            }
        }

        if (fields.length === 0) {
            console.log('No fields to update')
            return res.status(400).json({ message: 'No fields to update' })
        }

        values.push(userId) // Adding userId to the values array for the WHERE clause

        const q = `UPDATE users
                   SET ${fields.join(', ')}
                   WHERE userId = ?`

        db.query(q, values, (dbErr, result) => {
            if (dbErr) {
                console.error('Database error:', dbErr)
                return res.status(500).json({ message: 'Database error', error: dbErr })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found or no changes made' })
            }

            return res.status(200).json({ message: 'User updated successfully' })
        })
    })
}

export const deleteUser = (req, res) => {
    const { userId } = req.params

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' })
    }

    const q = 'DELETE FROM users WHERE userId = ?'

    db.query(q, [userId], (err, result) => {
        if (err) {
            console.error('Database error:', err)
            return res.status(500).json({ message: 'Database error', error: err })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' })
        }

        return res.status(200).json({ message: 'User deleted successfully' })
    })
}

// GET: /api/users/:userId/articles
export const getUserArticles = (req, res) => {
    const userId = req.params.userId

    const q = 'SELECT * FROM articles WHERE userId = ?'

    db.query(q, [userId], async (err, articles) => {
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