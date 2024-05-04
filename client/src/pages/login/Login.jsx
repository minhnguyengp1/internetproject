import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button } from 'antd'
import './login.scss'
import LoginForm from '../../forms/LoginForm.jsx'
import { loginThunk } from '../../redux/actions/userActions.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const Login = () => {
    console.log('HALLO TO LOGIN PAGE')

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    console.log('userLogin: ' + JSON.stringify(userLogin))

    const { error, userInfo } = userLogin

    console.log('location.search: ' + location.search)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    console.log('redirect: ' + redirect)

    // useEffect(() => {
    //     console.log(
    //         'userInfo when Login is redered: ' + JSON.stringify(userInfo)
    //     )
    //     if (userInfo) {
    //         navigate(redirect)
    //     }
    // }, [navigate, userInfo, redirect])
    useEffect(() => {
        console.log()
        if (userInfo) {
            // If userInfo exists, navigate to the previous URL
            if (location.state?.from) {
                navigate(location.state.from)
            }
        }
    }, [userInfo, navigate, location])

    const onFinish = (values) => {
        const email = values.email
        const password = values.password
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
            <Footer />
        </>
    )
}

export default Login
