import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './protected.route'
import { useSelector } from 'react-redux'

jest.mock('react-redux', () => ({
    useSelector: jest.fn()
}))

const MockComponent = () => <div>Mock Component</div>

describe('ProtectedRoute', () => {
    it('renders the component when authenticated', () => {
        useSelector.mockImplementation((callback) =>
            callback({
                userLogin: { isAuthenticated: true }
            })
        )

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route
                        path="/protected"
                        element={<ProtectedRoute component={MockComponent} />}
                    />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByText('Mock Component')).toBeInTheDocument()
    })

    it('redirects to login when not authenticated', () => {
        useSelector.mockImplementation((callback) =>
            callback({
                userLogin: { isAuthenticated: false }
            })
        )

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route
                        path="/protected"
                        element={<ProtectedRoute component={MockComponent} />}
                    />
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByText('Login Page')).toBeInTheDocument()
    })
})
