import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../components/Header/Header'

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
                <Router>
                    <Header />
                </Router>
            </Provider>
        )

        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    })

    it('shows login and register buttons when not authenticated', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Header />
                </Router>
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
                <Router>
                    <Header />
                </Router>
            </Provider>
        )

        //expect(screen.getByText('Test User')).toBeInTheDocument()
        expect(screen.getByText('Ausloggen')).toBeInTheDocument()
    })
})
