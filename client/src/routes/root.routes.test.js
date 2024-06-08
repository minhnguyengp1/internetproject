import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import RootRoutes from './root.routes'
import { SearchProvider } from '../context/SearchContext'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'

jest.mock(
    './protected.route',
    () =>
        ({ component }) =>
            component()
)

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('RootRoutes', () => {
    const renderWithProviders = (initialEntries, store) => {
        return render(
            <Provider store={store}>
                <SearchProvider>
                    <RootRoutes
                        router={({ children }) => (
                            <MemoryRouter initialEntries={initialEntries}>
                                {children}
                            </MemoryRouter>
                        )}
                    />
                </SearchProvider>
            </Provider>
        )
    }

    it('should render Home component for the root route', () => {
        const store = mockStore({ userLogin: {}, userDetails: {} })
        renderWithProviders(['/'], store)
        expect(screen.getByText(/All Categories/i)).toBeInTheDocument()
    })

    it('should render Article component for /article/:id route', () => {
        const store = mockStore({ userLogin: {}, userDetails: {} })
        renderWithProviders(['/article/1'], store)
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
    })

    it('should render CreateArticle component for /article/create route', () => {
        const store = mockStore({ userLogin: {}, userDetails: {} })
        renderWithProviders(['/article/create'], store)
        expect(screen.getByText(/Fertig!/i)).toBeInTheDocument()
    })
})
