import db from '../dbs/init.mysql.js'
import { getBlobUrl } from '../services/azureStorageService.js'

export const removeFollower = (req, res) => {
    const { userId } = req.body
    const { strangerId } = req.params

    if (!userId || !strangerId) {
        return res.status(400).json({ error: 'UserId and StrangerId are required' })
    }

    const query = 'DELETE FROM followers WHERE userId = ? AND followedUserId = ?'
    db.query(query, [userId, strangerId], (err, results) => {
        if (err) {
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
                 JOIN followers f ON u.userId = f.userId
        WHERE f.followedUserId = ?
    `

    db.query(query, [userId], (err, results) => {
        if (err) {
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

export const getUserFollowing = (req, res) => {
    const { userId } = req.params

    if (!userId) {
        return res.status(400).json({ error: 'UserId is required' })
    }

    const query = `
        SELECT u.userId, u.fullName, u.img, u.postalCode, u.street, u.city
        FROM users u
                 JOIN followers f ON u.userId = f.followedUserId
        WHERE f.userId = ?
    `

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' })
        }

        const followingWithDetails = results.map(user => ({
            userId: user.userId,
            fullName: user.fullName,
            img: getBlobUrl(user.img),
            postalCode: user.postalCode,
            street: user.street,
            city: user.city
        }))

        res.status(200).json(followingWithDetails)
    })
}

export const followUser = (req, res) => {
    const { userId, strangerId } = req.params

    if (!userId || !strangerId) {
        return res.status(400).json({ error: 'Both userId and strangerId are required' })
    }

    const query = 'INSERT INTO followers (userId, followedUserId) VALUES (?, ?)'
    db.query(query, [userId, strangerId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' })
        }
        res.status(201).json({ message: 'User followed successfully' })
    })
}

export const unfollowUser = (req, res) => {
    const { userId, strangerId } = req.params

    if (!userId || !strangerId) {
        return res.status(400).json({ error: 'Both userId and strangerId are required' })
    }

    const query = 'DELETE FROM followers WHERE userId = ? AND followedUserId = ?'
    db.query(query, [userId, strangerId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' })
        }
        res.status(200).json({ message: 'User unfollowed successfully' })
    })
}