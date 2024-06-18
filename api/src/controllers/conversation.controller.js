import db from '../dbs/init.mysql.js'

// POST /api/conversations
export const createConversation = (req, res) => {
    const { senderId, receiverId } = req.body

    const query = 'INSERT INTO conversations (senderId, receiverId) VALUES (?, ?)'
    const values = [senderId, receiverId]

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error creating conversation:', err)
            return res.status(500).json({ error: 'Internal server error' })
        }

        return res.status(201).json({
            id: result.insertId,
            senderId,
            receiverId
        })
    })
}

// GET /api/conversations/:userId
export const getConversationsByUserId = (req, res) => {
    const { userId } = req.params

    const query = 'SELECT * FROM conversations WHERE senderId = ? OR receiverId = ?'
    const values = [userId, userId]

    db.query(query, values, (err, rows) => {
        if (err) {
            console.error('Error fetching conversations:', err)
            return res.status(500).json({ error: 'Internal server error' })
        }

        return res.status(200).json(rows)
    })
}

// GET /api/conversations/find/:firstUserId/:secondUserId
export const getConversationBetweenUsers = (req, res) => {
    const { firstUserId, secondUserId } = req.params

    const query = `
        SELECT *
        FROM conversations
        WHERE (senderId = ? AND receiverId = ?)
           OR (senderId = ? AND receiverId = ?)
    `
    const values = [firstUserId, secondUserId, secondUserId, firstUserId]

    db.query(query, values, (err, rows) => {
        if (err) {
            console.error('Error fetching conversation:', err)
            return res.status(500).json({ error: 'Internal server error' })
        }

        if (rows.length > 0) {
            return res.status(200).json(rows[0])
        } else {
            return res.status(404).json({ error: 'Conversation not found' })
        }
    })
}
