import { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import axios from 'axios'
import './resetPassword.scss'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (values) => {
        const { newPassword, confirmPassword } = values

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            const token = new URLSearchParams(window.location.search).get('token')
            const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
                token,
                newPassword
            })
            setMessage(response.data)
            setError('')
        } catch (error) {
            setMessage('')
            setError('Error resetting password')
        }
    }

    return (
        <div className="reset-password">
            <div className="containerResetPassword">
                <h1>Reset Password</h1>
                <Form onFinish={handleSubmit}>
                    <Form.Item
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Bitte geben Sie Ihr neues Passwort ein.'
                            }
                        ]}
                    >
                        <Input.Password placeholder="Neues Passwort" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: 'Bitte bestätigen Sie Ihr neues Passwort.'
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('Die beiden Passwörter stimmen nicht überein.'))
                                }
                            })
                        ]}
                    >
                        <Input.Password placeholder="Neues Passwort bestätigen" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Passwort zurücksetzen
                        </Button>
                    </Form.Item>
                </Form>
                {message && <Alert message={message} type="success" showIcon />}
                {error && <Alert message={error} type="error" showIcon />}
                {message && (
                    <div className="go-to-login">
                        <Link to="/login">Zum Login</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResetPassword
