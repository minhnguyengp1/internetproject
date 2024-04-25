import { useNavigate } from 'react-router-dom'
import './register.scss'
import RegisterForm from '../../forms/RegisterForm.jsx'
import { Form, Button } from 'antd'
import AppLogo from '../../assets/app-logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { registerThunk } from '../../redux/actions/authActions.js'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const user = useSelector((state) => state.auth.user)

    const onFinish = (values) => {
        const email = values.email
        const password = values.password
        dispatch(registerThunk({ email, password }))

        console.log('values: ' + JSON.stringify(values))
        console.log('email: ' + email)
        console.log('password: ' + password)

        navigate('/login')
    }
    // const [inputs, setInputs] = useState({
    //     username: '',
    //     email: '',
    //     password: '',
    // })
    // const [err, setErr] = useState(null)
    // const navigate = useNavigate()

    // const handleChange = (e) => {
    //     setInputs((prev) => ({
    //         ...prev,
    //         [e.target.name]: e.target.value,
    //     }))
    // }

    // console.log(inputs)

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const res = await axios.post(
    //             'http://localhost:5000/api/auth/register',
    //             inputs
    //         )
    //         navigate('/login')
    //     } catch (err) {
    //         setErr(err.response.data)
    //     }
    // }

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
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Register</button>
                    {err && <p>{err}</p>}
                    <span>
                        Do you have an account?
                        <br />
                        <Link to="/login">Login</Link>
                    </span>
                </form> */}
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
                            'Log in'
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Register
