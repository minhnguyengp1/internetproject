import { useNavigate } from 'react-router-dom'
import './register.scss'
import RegisterForm from '../../forms/RegisterForm.jsx'
import { Form, Button } from 'antd'
import { useEffect } from 'react'
import AppLogo from '../../assets/logoBlack.png'
import { useDispatch, useSelector } from 'react-redux'
import { registerThunk } from '../../redux/actions/authActions.js'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const currentUser = useSelector((state) => state.auth.currentUser)
    const isScuccessful = useSelector((state) => state.auth.isSuccessful)

    const onFinish = (values) => {
        const email = values.email
        const password = values.password
        dispatch(registerThunk({ email, password }))

        console.log('values: ' + JSON.stringify(values))
        console.log('email: ' + email)
        console.log('password: ' + password)
    }

    useEffect(() => {
        console.log('isScuccessful when Register is redered: ' + isScuccessful)
        if (isScuccessful) {
            navigate('/login')
        }
    }, [isScuccessful])

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src={AppLogo} alt="" />
                    <button
                        className="loginButton"
                        onClick={() => navigate('/login')}
                    >
                        Sign In
                    </button>
                </div>
            </div>
            <div className="container">
                <h1>Register</h1>
                <Form
                    layout="vertical"
                    name="normal_register"
                    className="register-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <RegisterForm />
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
        </div>
    )
}

export default Register
