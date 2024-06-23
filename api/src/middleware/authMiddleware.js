import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' })
    }
}

export default authenticate
