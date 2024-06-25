import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RootRoutes from './root.routes'

// Mock BrowserRouter to avoid nested Routers
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom')
    return {
        ...originalModule,
        BrowserRouter: ({ children }) => <div>{children}</div>,
    }
})

// Mock ProtectedRoute and other components
jest.mock('./protected.route', () => ({ component: Component, ...rest }) => {
    return <Component {...rest} />
})
jest.mock('../pages/Home/Home', () => () => <div>Home Component</div>)
jest.mock('../pages/Login/Login', () => () => <div>Login Component</div>)
jest.mock('../pages/Register/Register', () => () => (
    <div>Register Component</div>
))
// Mock other components similarly

describe('RootRoutes', () => {
    it('renders Home component for / route', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <RootRoutes />
            </MemoryRouter>
        )
        expect(screen.getByText('Home Component')).toBeInTheDocument()
    })

    it('renders Login component for /login route', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <RootRoutes />
            </MemoryRouter>
        )
        expect(screen.getByText('Login Component')).toBeInTheDocument()
    })

    it('renders Register component for /register route', () => {
        render(
            <MemoryRouter initialEntries={['/register']}>
                <RootRoutes />
            </MemoryRouter>
        )
        expect(screen.getByText('Register Component')).toBeInTheDocument()
    })

    // Add more tests for other routes
})
