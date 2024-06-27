import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import Login from './Login'
import '@testing-library/jest-dom'
import { login } from '../../redux/actions/authActions'

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        }
    }

jest.mock('../../redux/actions/authActions')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
    userLogin: { error: null, isAuthenticated: false },
}

const store = mockStore(initialState)

describe('Login', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders Login component correctly', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        )

        expect(screen.getByText('Login')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /einloggen!/i })
        ).toBeInTheDocument()
    })

    test('handles form submission', async () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        )

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'test@example.com' },
        })
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password123' },
        })

        fireEvent.click(screen.getByRole('button', { name: /einloggen!/i }))

        await waitFor(() => {
            expect(login).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
            })
        })
    })

    test('redirects when authenticated', async () => {
        const authState = {
            ...initialState,
            userLogin: { error: null, isAuthenticated: true },
        }
        const authStore = mockStore(authState)

        render(
            <Provider store={authStore}>
                <MemoryRouter initialEntries={['/login?redirect=/']}>
                    <Login />
                </MemoryRouter>
            </Provider>
        )

        await waitFor(() => {
            expect(window.location.pathname).toBe('/')
        })
    })

    test('displays error message on login failure', () => {
        const errorState = {
            ...initialState,
            userLogin: {
                error: 'Invalid email or password',
                isAuthenticated: false,
            },
        }
        const errorStore = mockStore(errorState)

        render(
            <Provider store={errorStore}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        )

        expect(
            screen.getByText('Invalid email or password')
        ).toBeInTheDocument()
    })
})
