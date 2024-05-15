import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button } from 'antd'
import './login.scss'
import LoginForm from '../../forms/LoginForm.jsx'
import { loginThunk } from '../../redux/actions/authActions.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Header from '../../components/Header'

const Login = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { error, isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        // If the user is already authenticated, redirect them to the previous URL
        if (isAuthenticated) {
            if (location.state?.from) {
                navigate(location.state.from)
            } else {
                navigate('/')
            }
        }
    }, [isAuthenticated, navigate, location])

    const onFinish = (values) => {
        const { email, password } = values
        dispatch(loginThunk({ email, password }))
    }

    return (
        <>
            <Header />
            <div className="login">
                <div className="containerLogin">
                    <h1>Login</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
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
        </>
    )
}

export default Login
