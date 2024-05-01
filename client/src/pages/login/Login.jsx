import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'antd'
import './login.scss'
import LoginForm from '../../forms/LoginForm.jsx'
import { loginThunk } from '../../redux/actions/authActions.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Header from '../../components/Header'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log('HALLO TO LOGIN PAGE')

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const isSuccessful = useSelector((state) => state.auth.isSuccessful)

    console.log('isAuthenticated: ' + isAuthenticated)

    const onFinish = (values) => {
        const email = values.email
        const password = values.password
        dispatch(loginThunk({ email, password }))

        console.log('values: ' + JSON.stringify(values))
        console.log('email: ' + email)
        console.log('password: ' + password)
    }

    useEffect(() => {
        console.log('isSuccessful when Login is redered: ' + isSuccessful)
        if (isSuccessful) {
            navigate('/')
        }
    }, [isSuccessful])

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
