import React, { useState } from 'react'
import { Form, Input, Button, Alert, Typography } from 'antd'
import axios from 'axios'
import './settings.scss'
import UserLayout from '../../layouts/UserLayout/UserLayout.jsx'
import { useSelector } from 'react-redux'

const Settings = () => {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const { userId, loading } = useSelector(state => state.userLogin)

    console.log('userId: ', userId)

    const handleSubmit = async (values) => {
        const { currentPassword, newPassword, confirmPassword } = values

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            const response = await axios.put('http://localhost:5000/api/auth/update-password', {
                userId,
                currentPassword,
                newPassword
            })

            setMessage(response.data)
            setError('')
        } catch (error) {
            setMessage('')
            setError('Error updating password')
        }
    }

    return (
        <UserLayout>
            <div className="settings-container">
                <Typography.Title level={3} className="title">Passwort ändern</Typography.Title>
                {loading ? (
                    <Typography.Text>Loading...</Typography.Text>
                ) : (
                    <>
                        <Form onFinish={handleSubmit} className="form-wrapper">
                            <Form.Item
                                name="currentPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bitte geben Sie Ihr aktuelles Passwort ein.'
                                    }
                                ]}
                            >
                                <Input.Password placeholder="Aktuelles Passwort" />
                            </Form.Item>
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
                                    Passwort aktualisieren
                                </Button>
                            </Form.Item>
                        </Form>
                        {message && <Alert message={message} type="success" showIcon />}
                        {error && <Alert message={error} type="error" showIcon />}
                    </>
                )}
            </div>
        </UserLayout>
    )
}

export default Settings
