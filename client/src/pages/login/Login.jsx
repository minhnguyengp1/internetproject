import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'antd'
import AppLogo from '../../assets/app-logo.png'
import './login.scss'
import LoginForm from '../../forms/LoginForm.jsx'
import { loginThunk } from '../../redux/actions/authActions.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

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
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src={AppLogo} alt="" />
                    {/* <button className="loginButton">Sign In</button> */}
                </div>
            </div>
            <div className="container">
                <h1>Log In</h1>
                {/* <form>
                    <input
                        required
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button className="loginButton" onClick={handleSubmit}>
                        Sign In
                    </button>
                    {err && <p>{err}</p>}
                    <span>
                        Forgot your password? <b>Reset it here</b>
                    </span>
                    <span>
                        New to Kleinanzeigen?
                        <br />
                        <Link to="/register">Sign up now</Link>
                    </span>
                </form> */}
                <Form
                    layout="vertical"
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
                            // loading={isLoading}
                            size="large"
                        >
                            'Log in'
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
