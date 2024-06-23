import { db } from '../dbs/init.mysql.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

export const register = (req, res) => {
    const { email, password, fullName } = req.body

    const query1 = 'SELECT * FROM users WHERE email = ?'

    db.query(query1, [email], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' })
        }
        if (data.length) {
            return res.status(409).json({ message: 'User already exists' })
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const query2 = 'INSERT INTO users(`email`, `password`, `fullName`) VALUES (?, ?, ?)'

        db.query(query2, [email, hashedPassword, fullName], (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to create user' })
            }
            res.status(200).json({ message: 'User has been created successfully' })
        })
    })
}

export const login = (req, res) => {
    const query1 = 'SELECT * FROM users WHERE email = ?'

    db.query(query1, [req.body.email], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' })
        }
        if (data.length == 0) {
            return res.status(404).json({ message: 'User not found' })
        }

        const user = data[0]

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!isPasswordCorrect) {
            return res.status(400).json('Wrong password!')
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY)

        res.status(200).json({
            userId: user.userId,
            email: user.email,
            accessToken: token
        })
    })
}

const sendEmail = async (to, subject, html) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.BREVO_EMAIL_USER,
                pass: process.env.BREVO_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        })

        console.log('Email sent successfully')
    } catch (error) {
        console.error('Error sending email:', error)
    }
}

export const requestPasswordReset = (req, res) => {
    const { email } = req.body

    const query1 = 'SELECT * FROM users WHERE email = ?'

    db.query(query1, [email], async (err, users) => {
        if (err) {
            console.error('Database query error:', err)
            return res.status(500).json('Internal server error')
        }

        if (users.length === 0) {
            return res.status(404).json('User not found!')
        }

        const user = users[0]

        const token = jwt.sign({ id: user.userId }, process.env.JWT_RESET_KEY, { expiresIn: '30m' })

        const updateTokenQuery = 'UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE userId = ?'
        const expiresAt = Date.now() + 30 * 60 * 1000

        db.query(updateTokenQuery, [token, new Date(expiresAt), user.userId], async (err, result) => {
            if (err) {
                return res.status(500).json('Internal server error')
            }

            const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`
            const emailSubject = 'Password Reset Instructions'
            const emailHtml = `<p>Hello ${user.fullName},</p><p>You requested a password reset. Please follow <a href="${resetLink}">this link</a> to reset your password. The link will expire in 30 minutes.</p><p>If you did not request this, please ignore this email.</p>`

            try {
                await sendEmail(user.email, emailSubject, emailHtml)
                res.status(200).json(`Password reset instructions sent to ${user.email}`)
            } catch (error) {
                res.status(500).json('Error sending email')
            }
        })
    })
}

export const resetPassword = (req, res) => {
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
        return res.status(400).json('Invalid request')
    }

    jwt.verify(token, process.env.JWT_RESET_KEY, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err)
            return res.status(400).json('Invalid or expired token')
        }

        const userId = decoded.id

        const query1 = 'SELECT * FROM users WHERE userId = ? AND resetPasswordToken = ? AND resetPasswordExpires > ?'
        db.query(query1, [userId, token, new Date()], (err, users) => {
            if (err) {
                return res.status(500).json('Internal server error')
            }

            if (users.length === 0) {
                return res.status(400).json('Invalid or expired token')
            }

            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(newPassword, salt)

            const query2 = 'UPDATE users SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE userId = ?'
            db.query(query2, [hashedPassword, userId], (err, result) => {
                if (err) {
                    return res.status(500).json('Internal server error')
                }

                res.status(200).json('Password has been reset successfully')
            })
        })
    })
}

export const updatePassword = (req, res) => {
    const { userId, currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
        return res.status(400).json('Current password and new password are required')
    }

    const query = 'SELECT password FROM users WHERE userId = ?'
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user password:', err)
            return res.status(500).json('Internal server error')
        }

        if (results.length === 0) {
            return res.status(404).json('User not found')
        }

        const hashedPasswordFromDB = results[0].password

        bcrypt.compare(currentPassword, hashedPasswordFromDB, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err)
                return res.status(500).json('Internal server error')
            }

            if (!isMatch) {
                return res.status(401).json('Current password is incorrect')
            }

            const salt = bcrypt.genSaltSync(10)
            const hashedNewPassword = bcrypt.hashSync(newPassword, salt)

            const updateQuery = 'UPDATE users SET password = ? WHERE userId = ?'
            db.query(updateQuery, [hashedNewPassword, userId], (err, result) => {
                if (err) {
                    console.error('Error updating password:', err)
                    return res.status(500).json('Internal server error')
                }

                res.status(200).json('Password updated successfully')
            })
        })
    })
}