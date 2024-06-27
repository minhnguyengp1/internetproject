import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Alert, Input } from 'antd'
import './login.scss'
import { login } from '../../redux/actions/authActions.js'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const Login = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { error, isAuthenticated } = useSelector((state) => state.userLogin)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const handleSubmit = (values) => {
        const { email, password } = values
        dispatch(login({ email, password }))
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect)
        }
    }, [isAuthenticated, navigate, redirect])

    return (
        <>
            <div className="login">
                {error ? (
                    <div style={{ marginBottom: '24px' }}>
                        <Alert message={error} type="error" showIcon />
                    </div>
                ) : null}
                <div className="containerLogin">
                    <h1>Login</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Bitte geben Sie Ihre Email-Adresse ein.',
                                },
                                {
                                    type: 'email',
                                    message:
                                        'Bitte geben Sie eine gültige Email-Adresse ein.',
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Bitte geben Sie Ihr Passwort ein.',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <a className="login-form-forgot" href="/register">
                                Registrieren
                            </a>
                        </Form.Item>
                        <Form.Item>
                            <a
                                className="login-form-forgot"
                                href="/forgot-password"
                            >
                                Passwort vergessen? Klicken Sie hier
                            </a>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                size="large"
                            >
                                Einloggen!
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login
