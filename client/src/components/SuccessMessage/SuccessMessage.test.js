import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SuccessMessage from './SuccessMessage'

describe('SuccessMessage', () => {
    const defaultProps = {
        status: 'success',
        title: 'Success!',
        subTitle: 'Your action was successful.',
        primaryButtonText: 'Go to Homepage',
        primaryButtonLink: '/',
        secondaryButtonText: 'View Your Articles',
        secondaryButtonLink: '/user/articles',
    }

    const setup = (props = {}) => {
        return render(
            <MemoryRouter>
                <SuccessMessage {...defaultProps} {...props} />
            </MemoryRouter>
        )
    }

    test('renders the default success message correctly', () => {
        setup()

        expect(screen.getByText(defaultProps.title)).toBeInTheDocument()
        expect(screen.getByText(defaultProps.subTitle)).toBeInTheDocument()
        expect(
            screen.getByText(defaultProps.primaryButtonText)
        ).toBeInTheDocument()
        expect(
            screen.getByText(defaultProps.secondaryButtonText)
        ).toBeInTheDocument()
    })

    test('renders the provided props correctly', () => {
        const customProps = {
            status: 'info',
            title: 'Information',
            subTitle: 'This is an informational message.',
            primaryButtonText: 'Go to Dashboard',
            primaryButtonLink: '/dashboard',
            secondaryButtonText: 'View Profile',
            secondaryButtonLink: '/profile',
        }

        setup(customProps)

        expect(screen.getByText(customProps.title)).toBeInTheDocument()
        expect(screen.getByText(customProps.subTitle)).toBeInTheDocument()
        expect(
            screen.getByText(customProps.primaryButtonText)
        ).toBeInTheDocument()
        expect(
            screen.getByText(customProps.secondaryButtonText)
        ).toBeInTheDocument()

        const primaryButtonLink = screen
            .getByText(customProps.primaryButtonText)
            .closest('a')
        expect(primaryButtonLink).toHaveAttribute(
            'href',
            customProps.primaryButtonLink
        )

        const secondaryButtonLink = screen
            .getByText(customProps.secondaryButtonText)
            .closest('a')
        expect(secondaryButtonLink).toHaveAttribute(
            'href',
            customProps.secondaryButtonLink
        )
    })

    test('renders the buttons with correct links', () => {
        setup()

        const primaryButtonLink = screen
            .getByText(defaultProps.primaryButtonText)
            .closest('a')
        expect(primaryButtonLink).toHaveAttribute(
            'href',
            defaultProps.primaryButtonLink
        )

        const secondaryButtonLink = screen
            .getByText(defaultProps.secondaryButtonText)
            .closest('a')
        expect(secondaryButtonLink).toHaveAttribute(
            'href',
            defaultProps.secondaryButtonLink
        )
    })
})
