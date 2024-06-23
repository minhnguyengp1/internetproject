import db from '../dbs/init.mysql.js'
import { fetchImageUrls } from '../utils/helpers.js'
import { getBlobUrl } from '../services/azureStorageService.js'

export const addFollower = (req, res) => {
    const { userId, followerId } = req.body

    if (!userId || !followerId) {
        return res.status(400).json({ error: 'UserId and FollowerId are required' })
    }

    const query = 'INSERT INTO followers (userId, followerId) VALUES (?, ?)'
    db.query(query, [userId, followerId], (err, results) => {
        if (err) {
            console.error('Error adding follower:', err)
            return res.status(500).json({ error: 'Internal server error' })
        }
        res.status(200).json({ message: 'Follower added successfully' })
    })
}

export const removeFollower = (req, res) => {
    const { userId, followerId } = req.body

    if (!userId || !followerId) {
        return res.status(400).json({ error: 'UserId and FollowerId are required' })
    }

    const query = 'DELETE FROM followers WHERE userId = ? AND followerId = ?'
    db.query(query, [userId, followerId], (err, results) => {
        if (err) {
            console.error('Error removing follower:', err)
            return res.status(500).json({ error: 'Internal server error' })
        }
        res.status(200).json({ message: 'Follower removed successfully' })
    })
}

export const getUserFollowers = (req, res) => {
    const { userId } = req.params

    if (!userId) {
        return res.status(400).json({ error: 'UserId is required' })
    }

    const query = `
        SELECT u.userId, u.fullName, u.img, u.postalCode, u.street, u.city
        FROM users u
                 JOIN followers f ON u.userId = f.followerId
        WHERE f.userId = ?
    `

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching followers:', err)
            return res.status(500).json({ error: 'Internal server error' })
        }

        const followersWithDetails = results.map(follower => ({
            userId: follower.userId,
            fullName: follower.fullName,
            img: getBlobUrl(follower.img),
            postalCode: follower.postalCode,
            street: follower.street,
            city: follower.city
        }))

        res.status(200).json(followersWithDetails)
    })
}