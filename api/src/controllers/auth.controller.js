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

        console.log('data: ' + JSON.stringify(data));
        console.log('data[0]: ' + JSON.stringify(data[0]));
        console.log('email: ' + JSON.stringify(data[0]));

        // CHECK PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password,
        );

        console.log(isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(400).json('Wrong password!');
        }

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY);

        const { password, ...other } = data[0];

        other.access_token = token;

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
        })
            .status(200)
            .json(other);
    });
};

export const logout = (req, res) => {
    res.clearCookie('access_token', {
        sameSite: 'none',
        secure: true,
    })
        .status(200)
        .json('User has been logged out.');
};
