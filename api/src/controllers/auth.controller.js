import { db } from '../dbs/init.mysql.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
    const query1 = 'SELECT * FROM users WHERE email = ?';

    // const values01 = [req.body.email];

    db.query(query1, [req.body.email], (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (data.length) {
            return res.status(409).json('User already exists!');
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = 'INSERT INTO users(`email`, `password`) VALUES (?)';

        const values = [req.body.email, hashedPassword];

        db.query(q, [values], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.status(200).json('User has been created.');
        });
    });
};

export const login = (req, res) => {
    const query1 = 'SELECT * FROM users WHERE email = ?';

    db.query(query1, [req.body.email], (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (data.length == 0) {
            return res.status(404).json('User not found!');
        }

        const user = data[0];

        console.log('data: ' + JSON.stringify(data));
        console.log('data[0]: ' + JSON.stringify(data[0]));
        console.log('user: ' + JSON.stringify(user));

        // CHECK PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password,
        );

        console.log(isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(400).json('Wrong password!');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);

        res.status(200).json({
            userId: user.userId,
            email: user.email,
            accessToken: token,
        });
    });
};

export const logout = (req, res) => {
    res.status(200).json('User has been logged out.');
};
