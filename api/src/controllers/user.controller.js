import { db } from '../dbs/init.mysql.js';
import jwt from 'jsonwebtoken';

// /api/users/:userId
export const getUser = (req, res) => {
    const q = 'SELECT * FROM users WHERE userId = ?';

    db.query(q, [req.params.userId], (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = data[0];

        return res.status(200).json({
            userId: user.userId,
            fullName: user.fullName,
            email: user.email,
            street: user.street,
            city: user.city,
            postalCode: user.postalCode,
            lastActiveTimeStamp: user.lastActiveTimeStamp,
            img: user.img,
        });
    });
};
