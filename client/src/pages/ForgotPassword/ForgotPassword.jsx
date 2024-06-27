import { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import axios from 'axios'
import './forgotPassword.scss'

const ForgotPassword = () => {
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (values) => {
        try {
            const { email } = values
            const response = await axios.post(
                'http://localhost:5000/api/auth/request-password-reset',
                { email }
            )
            setSuccessMessage(response.data)
            setErrorMessage('')
        } catch (error) {
            setErrorMessage(error.response.data)
            setSuccessMessage('')
        }
    }

    return (
        <div className="forgot-password">
            <div className="containerForgotPassword">
                <h1>Passwort zurücksetzen</h1>
                <Form onFinish={handleSubmit}>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Bitte geben Sie Ihre E-Mail-Adresse ein',
                            },
                            {
                                type: 'email',
                                message:
                                    'Bitte geben Sie eine gültige E-Mail-Adresse ein',
                            },
                        ]}
                    >
                        <Input placeholder="E-Mail" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Passwort zurücksetzen!
                        </Button>
                    </Form.Item>
                </Form>
                {successMessage && (
                    <Alert message={successMessage} type="success" showIcon />
                )}
                {errorMessage && (
                    <Alert message={errorMessage} type="error" showIcon />
                )}
            </div>
        </div>
    )
}

export default ForgotPassword
