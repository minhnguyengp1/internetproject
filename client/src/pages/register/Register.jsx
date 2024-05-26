import { useLocation, useNavigate } from 'react-router-dom'
import './register.scss'
// import RegisterForm from '../../forms/RegisterForm.jsx'
import { Form, Button, Alert, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import AppLogo from '../../assets/logoBlack.png'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/actions/authActions.js'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import Header from '../../components/Header.jsx'
import Footer from '../../components/Footer.jsx'

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
        const { name, email, password } = values
        dispatch(register({ name, email, password }))
    }

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate({
                    pathname: '/login',
                    search: `?redirect=${redirect}`,
                })
            }, 3000)
        }
        if (error) {
            console.log('error: ', error)
            setErrorMessage(error)
        } else {
            setErrorMessage('')
        }
    }, [success, redirect, navigate, error])

    return (
        <>
            <div className="register">
                <Header />
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
                            remember: true,
                        }}
                        onFinish={handleSubmit}
                    >
                        {/*<RegisterForm />*/}
                        <Form.Item
                            name="name"
                            label="name"
                            rules={[
                                {
                                    required: true,
                                },
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
                            label="email"
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    type: 'email',
                                },
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
                            label="password"
                            rules={[
                                {
                                    required: true,
                                },
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
                            label="confirm_password"
                            rules={[
                                {
                                    required: true,
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
                                    },
                                }),
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
                                // loading={isLoading}
                                size="large"
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Register
