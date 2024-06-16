import { db } from '../dbs/init.mysql.js'
import jwt from 'jsonwebtoken'

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

        return res.status(200).json({
            userId: user.userId,
            fullName: user.fullName,
            email: user.email,
            street: user.street,
            city: user.city,
            postalCode: user.postalCode,
            lastActiveTimeStamp: user.lastActiveTimeStamp,
            img: user.img
        })
    })
}

// PUT: /api/users/:userId
export const updateUser = (req, res) => {
    const { userId } = req.params
    const { fullName, street, city, postalCode } = req.body

    // Validate inputs
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' })
    }

    if (!fullName && (!street || !city || !postalCode)) {
        return res.status(400).json({ message: 'At least one field (fullName or address fields) must be provided for update' })
    }

    // Constructing the SET part of the SQL query dynamically
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

    if (fields.length === 0) {
        return res.status(400).json({ message: 'No fields to update' })
    }

    values.push(userId) // Adding userId to the values array for the WHERE clause

    const q = `UPDATE users
               SET ${fields.join(', ')}
               WHERE userId = ?`

    db.query(q, values, (err, result) => {
        if (err) {
            return res.status(500).send(err)
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' })
        }

        return res.status(200).json({ message: 'User updated successfully' })
    })
}

// GET: /api/users/:userId/articles
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