import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './register.scss'
import AppLogo from '../../assets/app-logo.png'

const Register = () => {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [err, setErr] = useState(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    console.log(inputs)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                'http://localhost:5000/api/auth/register',
                inputs
            )
            navigate('/login')
        } catch (err) {
            setErr(err.response.data)
        }
    }

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
                <form>
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
                </form>
            </div>
        </div>
    )
}

export default Register
