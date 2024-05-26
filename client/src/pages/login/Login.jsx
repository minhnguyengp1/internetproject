import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Alert } from 'antd'
import './login.scss'
import LoginForm from '../../forms/LoginForm.jsx'
import { login } from '../../redux/actions/authActions.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const Login = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

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
        if (error) {
            setErrorMessage(error)
        } else {
            setErrorMessage('')
        }
    }, [isAuthenticated, error, navigate, redirect])

    return (
        <div className="loginMainContainer">
            <Header />
            <div className="login">
                {errorMessage ? (
                    <div style={{ marginBottom: '24px' }}>
                        <Alert message={errorMessage} type="error" showIcon />
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
                        <LoginForm />
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                size="large"
                            >
                                Einloggen
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login
