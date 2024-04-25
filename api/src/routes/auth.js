// import { Router } from 'express';
// import User from '../models/User.js';
// import crypto from 'crypto-js';
// import jwt from 'jsonwebtoken';
// import Cookies from 'js-cookie';

// const router = Router(); // Use Router from express

// // Register
// router.post('/register', async (req, res) => {
//     console.log(req.body);
//     const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: crypto.AES.encrypt(
//             req.body.password,
//             process.env.SECRET_KEY,
//         ).toString(),
//     });

//     try {
//         const user = await newUser.save();
//         console.log(user);
//         res.status(201).json(user);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // Login
// router.post('/login', async (req, res) => {
//     try {
//         console.log('req.body: ' + JSON.stringify(req.body));
//         const user = await User.findOne({ username: req.body.username });
//         !user && res.status(401).json('Wrong email!');

//         const savedPassword = crypto.AES.decrypt(
//             user.password,
//             process.env.SECRET_KEY,
//         ).toString(crypto.enc.Utf8);

//         savedPassword !== req.body.password &&
//             res.status(401).json('Wrong password or username!');

//         const payload = { id: user._id, isAdmin: user.isAdmin };
//         const accessToken = jwt.sign(payload, process.env.JWT_KEY, {
//             expiresIn: '5d',
//         });

//         const { password, ...info } = user._doc;

//         console.log('info: ' + JSON.stringify(info));
//         console.log('accessToken: ' + accessToken);

//         Cookies.set('access_token', accessToken, { expires: 5 });

//         res.status(200).json({ ...info, accessToken });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// export default router;
