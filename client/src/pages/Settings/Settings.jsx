import React, { useState } from 'react'
import { Form, Input, Button, Alert, Typography } from 'antd'
import axios from 'axios'
import './settings.scss'
import UserLayout from '../../layouts/UserLayout/UserLayout.jsx'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx'
import { deleteUser } from '../../redux/actions/userActions.js'

const Settings = () => {
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isConfirmVisible, setIsConfirmVisible] = useState(false)
    const { userId, loading } = useSelector(state => state.userLogin)

    const handleSubmit = async (values) => {
        const { currentPassword, newPassword, confirmPassword } = values

        if (newPassword !== confirmPassword) {
            setError('Passwörter stimmen nicht überein')
            return
        }

        try {
            const response = await axios.put('http://localhost:5000/api/auth/update-password', {
                userId,
                currentPassword,
                newPassword
            })

            setMessage('Passwort erfolgreich aktualisiert')
            setError('')
        } catch (error) {
            setMessage('')
            setError('Fehler beim Aktualisieren des Passworts')
        }
    }

    const handleConfirmDelete = async () => {
        try {
            setMessage('Profil wird gelöscht...')
            setIsConfirmVisible(false)
            await dispatch(deleteUser())
            setTimeout(async () => {
                setMessage('Profil erfolgreich gelöscht.')
            }, 3000)
        } catch (error) {
            setError('Fehler beim Löschen des Profils')
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

                <Typography.Title level={3} className="title">
                    Profil löschen
                </Typography.Title>
                <div className="delete-profile-section">
                    <Typography.Text className="delete-warning">
                        Achtung: Diese Aktion kann nicht rückgängig gemacht werden!
                    </Typography.Text>
                    <Button type="danger" className="delete-button" onClick={() => setIsConfirmVisible(true)}>
                        Profil löschen
                    </Button>
                    <ConfirmationModal
                        isOpen={isConfirmVisible}
                        onClose={() => setIsConfirmVisible(false)}
                        onConfirm={handleConfirmDelete}
                        title="Profil löschen"
                        content="Möchten Sie wirklich Ihr Profil löschen?"
                    />
                </div>
            </div>
        </UserLayout>
    )
}

export default Settings
