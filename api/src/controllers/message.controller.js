import db from '../dbs/init.mysql.js'

export const createMessage = async (req, res) => {
    const { conversationId, senderId, text } = req.body

    try {
        const [result] = await db.execute(
            'INSERT INTO messages (conversationId, senderId, text) VALUES (?, ?, ?)',
            [conversationId, senderId, text]
        )

        res.status(201).json({ id: result.insertId, conversationId, senderId, text })
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const getMessagesByConversationId = async (req, res) => {
    const { conversationId } = req.params

    try {
        const [rows] = await db.execute(
            'SELECT * FROM messages WHERE conversationId = ? ORDER BY createdAt ASC',
            [conversationId]
        )

        res.status(200).json(rows)
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
}