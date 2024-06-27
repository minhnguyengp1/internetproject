import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import ResetPassword from './ResetPassword'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'

jest.mock('axios')

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        }
    }

describe('ResetPassword', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders ResetPassword form correctly', () => {
        render(
            <Router>
                <ResetPassword />
            </Router>
        )

        expect(screen.getByText('Reset Password')).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText('Neues Passwort')
        ).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText('Neues Passwort bestätigen')
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /passwort zurücksetzen/i })
        ).toBeInTheDocument()
    })

    test('displays error message if passwords do not match', async () => {
        render(
            <Router>
                <ResetPassword />
            </Router>
        )

        const newPasswordInput = screen.getByPlaceholderText('Neues Passwort')
        const confirmPasswordInput = screen.getByPlaceholderText(
            'Neues Passwort bestätigen'
        )
        const submitButton = screen.getByRole('button', {
            name: /passwort zurücksetzen/i,
        })

        fireEvent.change(newPasswordInput, { target: { value: 'password123' } })
        fireEvent.change(confirmPasswordInput, {
            target: { value: 'differentPassword' },
        })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(
                screen.getByText('Die beiden Passwörter stimmen nicht überein.')
            ).toBeInTheDocument()
        })
    })

    test('displays success message on successful password reset', async () => {
        const successResponse = { data: 'Password has been reset successfully' }
        axios.post.mockResolvedValueOnce(successResponse)

        render(
            <Router>
                <ResetPassword />
            </Router>
        )

        const newPasswordInput = screen.getByPlaceholderText('Neues Passwort')
        const confirmPasswordInput = screen.getByPlaceholderText(
            'Neues Passwort bestätigen'
        )
        const submitButton = screen.getByRole('button', {
            name: /passwort zurücksetzen/i,
        })

        fireEvent.change(newPasswordInput, { target: { value: 'password123' } })
        fireEvent.change(confirmPasswordInput, {
            target: { value: 'password123' },
        })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(
                screen.getByText('Password has been reset successfully')
            ).toBeInTheDocument()
            expect(screen.getByText('Zum Login')).toBeInTheDocument()
        })
    })

    test('displays error message on failed password reset', async () => {
        const errorResponse = { response: { data: 'Error resetting password' } }
        axios.post.mockRejectedValueOnce(errorResponse)

        render(
            <Router>
                <ResetPassword />
            </Router>
        )

        const newPasswordInput = screen.getByPlaceholderText('Neues Passwort')
        const confirmPasswordInput = screen.getByPlaceholderText(
            'Neues Passwort bestätigen'
        )
        const submitButton = screen.getByRole('button', {
            name: /passwort zurücksetzen/i,
        })

        fireEvent.change(newPasswordInput, { target: { value: 'password123' } })
        fireEvent.change(confirmPasswordInput, {
            target: { value: 'password123' },
        })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(
                screen.getByText('Error resetting password')
            ).toBeInTheDocument()
        })
    })
})
