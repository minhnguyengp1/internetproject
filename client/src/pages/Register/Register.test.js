import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import Register from './Register'
import '@testing-library/jest-dom'
import { register } from '../../redux/actions/authActions'

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
    userRegister: { error: null, loading: false, success: false },
}

const store = mockStore(initialState)

describe('Register', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders Register component correctly', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Register />
                </Router>
            </Provider>
        )

        expect(screen.getByText('Register')).toBeInTheDocument()
        expect(screen.getByLabelText('Name')).toBeInTheDocument()
        expect(screen.getByLabelText('Email')).toBeInTheDocument()
        expect(screen.getByLabelText('Passwort')).toBeInTheDocument()
        expect(screen.getByLabelText('Passwort bestätigen')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /register/i })
        ).toBeInTheDocument()
    })

    test('handles form submission', async () => {
        render(
            <Provider store={store}>
                <Router>
                    <Register />
                </Router>
            </Provider>
        )

        fireEvent.change(screen.getByLabelText('Name'), {
            target: { value: 'John Doe' },
        })
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'test@example.com' },
        })
        fireEvent.change(screen.getByLabelText('Passwort'), {
            target: { value: 'password123' },
        })
        fireEvent.change(screen.getByLabelText('Passwort bestätigen'), {
            target: { value: 'password123' },
        })

        fireEvent.click(screen.getByRole('button', { name: /register/i }))

        await waitFor(() => {
            expect(register).toHaveBeenCalledWith({
                fullName: 'John Doe',
                email: 'test@example.com',
                password: 'password123',
            })
        })
    })

    test('redirects to login on successful registration', async () => {
        const successState = {
            ...initialState,
            userRegister: { error: null, loading: false, success: true },
        }
        const successStore = mockStore(successState)

        render(
            <Provider store={successStore}>
                <MemoryRouter initialEntries={['/register?redirect=/,/login']}>
                    <Register />
                </MemoryRouter>
            </Provider>
        )

        await waitFor(() => {
            expect(window.location.pathname).toBe('/')
        })
    })

    test('displays error message on registration failure', () => {
        const errorState = {
            ...initialState,
            userRegister: {
                error: 'Registration failed',
                loading: false,
                success: false,
            },
        }
        const errorStore = mockStore(errorState)

        render(
            <Provider store={errorStore}>
                <Router>
                    <Register />
                </Router>
            </Provider>
        )

        expect(screen.getByText('Registration failed')).toBeInTheDocument()
    })
})
