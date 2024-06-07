import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import { SearchProvider } from '../context/SearchContext'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Header Component', () => {
    let store

    beforeEach(() => {
        store = mockStore({
            userLogin: {
                isAuthenticated: false,
            },
            userDetails: {
                error: null,
                userDetails: { fullName: 'Test User' },
            },
        })
    })

    it('renders correctly', () => {
        render(
            <Provider store={store}>
                <SearchProvider>
                    <Router>
                        <Header />
                    </Router>
                </SearchProvider>
            </Provider>
        )

        expect(
            screen.getByPlaceholderText('input search text')
        ).toBeInTheDocument()
    })

    it('shows login and register buttons when not authenticated', () => {
        render(
            <Provider store={store}>
                <SearchProvider>
                    <Router>
                        <Header />
                    </Router>
                </SearchProvider>
            </Provider>
        )

        expect(screen.getByText('Registrieren')).toBeInTheDocument()
        expect(screen.getByText('Einloggen')).toBeInTheDocument()
    })

    it('shows user name and logout button when authenticated', () => {
        store = mockStore({
            userLogin: {
                isAuthenticated: true,
            },
            userDetails: {
                error: null,
                userDetails: { fullName: 'Test User' },
            },
        })

        render(
            <Provider store={store}>
                <SearchProvider>
                    <Router>
                        <Header />
                    </Router>
                </SearchProvider>
            </Provider>
        )

        expect(screen.getByText('Test User')).toBeInTheDocument()
        expect(screen.getByText('Ausloggen')).toBeInTheDocument()
    })

    it('logs out and navigates to the login page when logout button is clicked', () => {
        store = mockStore({
            userLogin: {
                isAuthenticated: true,
            },
            userDetails: {
                error: null,
                userDetails: { fullName: 'Test User' },
            },
        })

        render(
            <Provider store={store}>
                <SearchProvider>
                    <Router>
                        <Header />
                    </Router>
                </SearchProvider>
            </Provider>
        )

        fireEvent.click(screen.getByText('Ausloggen'))
        expect(store.getActions()).toContainEqual({ type: 'LOGOUT' })
    })
})
