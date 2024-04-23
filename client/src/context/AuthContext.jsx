import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    )

    const login = async (inputs) => {
        console.log('inside login()')
        console.log('inputs inside login(): ' + JSON.stringify(inputs))
        const res = await axios.post(
            'http://localhost:5000/api/auth/login',
            inputs
        )
        console.log('res.data from login() ' + JSON.stringify(res.data))
        setCurrentUser(res.data)
    }

    const logout = async (inputs) => {
        const res = await axios.post('http://localhost:5000/api/auth/logout')
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
