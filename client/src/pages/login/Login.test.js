import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import configureStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import Login from './Login'
import { login } from '../../redux/actions/authActions'
import { SearchProvider } from '../../context/SearchContext'

jest.mock('../../redux/actions/authActions')

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {},
        }
    }

// Create a mock store
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const renderWithProviders = (ui, { store, history } = {}) => {
    return render(
        <Provider store={store}>
            <SearchProvider>
                <Router history={history}>{ui}</Router>
            </SearchProvider>
        </Provider>
    )
}

describe('Login Component', () => {
    let store
    let history

    beforeEach(() => {
        store = mockStore({
            userLogin: {
                error: null,
                isAuthenticated: false,
            },
            userDetails: {
                error: null,
                userDetails: null, // Adjust the initial state if needed
            },
        })
        history = createMemoryHistory()
    })

    it('renders the component and its children correctly', () => {
        renderWithProviders(<Login />, { store, history })

        // Check if Header is rendered
        expect(screen.getByAltText('yabe')).toBeInTheDocument()

        // Check if LoginForm is rendered
        expect(screen.getByText('Login')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /Einloggen!/i })
        ).toBeInTheDocument()

        // Check if Footer is rendered
        expect(screen.getByText(/Über uns/i)).toBeInTheDocument()
    })

    it('handles form submission correctly', async () => {
        const email = 'test@example.com'
        const password = 'password'

        login.mockResolvedValueOnce({})

        renderWithProviders(<Login />, { store, history })

        fireEvent.input(screen.getByPlaceholderText('Email'), {
            target: { value: email },
        })
        fireEvent.input(screen.getByPlaceholderText('Password'), {
            target: { value: password },
        })

        fireEvent.click(screen.getByRole('button', { name: /Einloggen!/i }))

        await waitFor(() => {
            expect(login).toHaveBeenCalledWith({ email, password })
        })
    })

    it('displays error message when login fails', () => {
        const error = 'Invalid credentials'
        store = mockStore({
            userLogin: {
                error: error,
                isAuthenticated: false,
            },
            userDetails: {
                error: null,
                userDetails: null,
            },
        })

        renderWithProviders(<Login />, { store, history })

        expect(screen.getByText(error)).toBeInTheDocument()
    })

    it('redirects to the specified page after successful login', () => {
        store = mockStore({
            userLogin: {
                error: null,
                isAuthenticated: true,
            },
            userDetails: {
                error: null,
                userDetails: null,
            },
        })

        renderWithProviders(<Login />, { store, history })

        expect(history.location.pathname).toBe('/')
    })
})
