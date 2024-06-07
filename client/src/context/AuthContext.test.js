import React, { useContext } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { AuthContext, AuthContextProvider } from './AuthContext' // Adjust the import path as necessary
import { act } from 'react-dom/test-utils'

// Mock axios
jest.mock('axios')

// Component to test the context
const TestComponent = () => {
    const { currentUser, login, logout } = useContext(AuthContext)

    return (
        <div>
            <div>{currentUser ? currentUser.username : 'No user'}</div>
            <button
                onClick={() =>
                    login({ username: 'test', password: 'password' })
                }
            >
                Login
            </button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

describe('AuthContextProvider', () => {
    afterEach(() => {
        jest.clearAllMocks()
        localStorage.clear()
    })

    it('logs in a user', async () => {
        axios.post.mockResolvedValueOnce({ data: { username: 'testUser' } })

        render(
            <AuthContextProvider>
                <TestComponent />
            </AuthContextProvider>
        )

        await act(async () => {
            fireEvent.click(screen.getByText('Login'))
        })

        const userDiv = await screen.findByText('testUser')
        expect(userDiv).toBeInTheDocument()
        expect(localStorage.getItem('user')).toBe(
            JSON.stringify({ username: 'testUser' })
        )
    })
})
