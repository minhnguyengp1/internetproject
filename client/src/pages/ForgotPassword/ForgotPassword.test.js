import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import ForgotPassword from './ForgotPassword'
import '@testing-library/jest-dom'

window.matchMedia =
    window.matchMedia ||
    function() {
        return {
            matches: false,
            addListener: jest.fn(),
            removeListener: jest.fn()
        }
    }

jest.mock('axios')

describe('ForgotPassword', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders ForgotPassword form correctly', () => {
        render(<ForgotPassword />)

        expect(screen.getByText('Passwort zurücksetzen')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('E-Mail')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /passwort zurücksetzen/i })
        ).toBeInTheDocument()
    })

    test('displays error message for invalid email', async () => {
        render(<ForgotPassword />)

        const emailInput = screen.getByPlaceholderText('E-Mail')
        const submitButton = screen.getByRole('button', {
            name: /passwort zurücksetzen/i
        })

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(
                screen.getByText(
                    'Bitte geben Sie eine gültige E-Mail-Adresse ein'
                )
            ).toBeInTheDocument()
        })
    })

    test('displays success message on successful form submission', async () => {
        const successResponse = {
            data: 'Password reset link sent successfully'
        }
        axios.post.mockResolvedValueOnce(successResponse)

        render(<ForgotPassword />)

        const emailInput = screen.getByPlaceholderText('E-Mail')
        const submitButton = screen.getByRole('button', {
            name: /passwort zurücksetzen/i
        })

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(
                screen.getByText('Password reset link sent successfully')
            ).toBeInTheDocument()
        })
    })

    test('displays error message on failed form submission', async () => {
        const errorResponse = {
            response: { data: 'Error sending password reset link' }
        }
        axios.post.mockRejectedValueOnce(errorResponse)

        render(<ForgotPassword />)

        const emailInput = screen.getByPlaceholderText('E-Mail')
        const submitButton = screen.getByRole('button', {
            name: /passwort zurücksetzen/i
        })

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(
                screen.getByText('Error sending password reset link')
            ).toBeInTheDocument()
        })
    })
})
