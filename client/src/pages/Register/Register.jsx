import { useLocation, useNavigate } from 'react-router-dom'
import './register.scss'
import { Form, Button, Alert, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/actions/authActions.js'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'

const Register = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    const { error, loading, success } = useSelector(
        (state) => state.userRegister
    )

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const handleSubmit = (values) => {
        const { fullName, email, password } = values
        dispatch(register({ fullName, email, password }))
    }

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate({
                    pathname: '/login',
                    search: `?redirect=${redirect}`
                })
            }, 3000)
        }
        if (error) {
            setErrorMessage(error)
        } else {
            setErrorMessage('')
        }
    }, [success, redirect, navigate, error])

    return (
        <>
            <div className="register">
                {errorMessage ? (
                    <div style={{ marginBottom: '24px' }}>
                        <Alert message={errorMessage} type="error" showIcon />
                    </div>
                ) : null}
                <div className="containerRegister">
                    <h1>Register</h1>
                    <Form
                        // layout="vertical"
                        name="normal_register"
                        className="register-form"
                        initialValues={{
                            remember: true
                        }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="fullName"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bitte geben Sie Ihren Namen ein.'
                                }
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bitte geben Sie eine Email-Adresse ein.'
                                },
                                {
                                    type: 'email',
                                    message: 'Bitte geben Sie eine gültige Email-Adresse ein.'
                                }
                            ]}
                        >
                            <Input
                                prefix={
                                    <MailOutlined className="site-form-item-icon" />
                                }
                                type="email"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Passwort"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bitte geben Sie ein Passwort ein.'
                                }
                            ]}
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm_password"
                            label="Passwort bestätigen"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bitte geben Sie zur Bestätigung das Passwort erneut ein.'
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error(
                                                'The two passwords that you entered do not match!'
                                            )
                                        )
                                    }
                                })
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="register-form-button"
                                loading={loading}
                                size="large"
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Register
