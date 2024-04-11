// import axios from 'axios'
// import React, { useContext, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext.jsx'

// const Login = () => {
//     const [inputs, setInputs] = useState({
//         username: '',
//         password: '',
//     })
//     const [err, setErr] = useState(null)
//     const navigate = useNavigate()

//     const { login } = useContext(AuthContext)

//     const handleChange = (e) => {
//         setInputs((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }))
//     }

//     console.log(inputs)

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             //  const res = await axios.post(
//             //    'http://localhost:8800/api/auth/login',
//             //    inputs,
//             //  )
//             //  console.log(res)
//             await login(inputs)
//             navigate('/')
//         } catch (err) {
//             setErr(err.response.data)
//         }
//     }

//     return (
//         <div className="auth">
//             <h1>Login</h1>
//             <form>
//                 <input
//                     required
//                     type="text"
//                     name="username"
//                     placeholder="username"
//                     onChange={handleChange}
//                 />
//                 <input
//                     required
//                     type="password"
//                     name="password"
//                     placeholder="password"
//                     onChange={handleChange}
//                 />
//                 <button onClick={handleSubmit}>Login</button>
//                 {err && <p>{err}</p>}
//                 <span>
//                     Don't you have an account?
//                     <br />
//                     <Link to="/register">Register</Link>
//                 </span>
//             </form>
//         </div>
//     )
// }

// export default Login
