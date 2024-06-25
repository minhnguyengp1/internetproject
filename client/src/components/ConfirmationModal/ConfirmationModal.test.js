import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ConfirmationModal from './ConfirmationModal'
import alarmImage from '../../assets/alarm.jpg'

describe('ConfirmationModal', () => {
    const mockOnClose = jest.fn()
    const mockOnConfirm = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders correctly when isOpen is true', () => {
        render(
            <ConfirmationModal
                isOpen={true}
                onClose={mockOnClose}
                onConfirm={mockOnConfirm}
                title="Test Title"
                content="Test Content"
            />
        )

        expect(screen.getByText('Test Title')).toBeInTheDocument()
        expect(screen.getByText('Test Content')).toBeInTheDocument()
        expect(screen.getByAltText('Confirmation Visual')).toHaveAttribute(
            'src',
            alarmImage
        )
        expect(screen.getByText('No')).toBeInTheDocument()
        expect(screen.getByText('Yes')).toBeInTheDocument()
    })

    test('does not render when isOpen is false', () => {
        render(
            <ConfirmationModal
                isOpen={false}
                onClose={mockOnClose}
                onConfirm={mockOnConfirm}
                title="Test Title"
                content="Test Content"
            />
        )

        expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
        expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
        expect(
            screen.queryByAltText('Confirmation Visual')
        ).not.toBeInTheDocument()
        expect(screen.queryByText('No')).not.toBeInTheDocument()
        expect(screen.queryByText('Yes')).not.toBeInTheDocument()
    })

    test('calls onClose when No button is clicked', () => {
        render(
            <ConfirmationModal
                isOpen={true}
                onClose={mockOnClose}
                onConfirm={mockOnConfirm}
                title="Test Title"
                content="Test Content"
            />
        )

        fireEvent.click(screen.getByText('No'))
        expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    test('calls onConfirm when Yes button is clicked', () => {
        render(
            <ConfirmationModal
                isOpen={true}
                onClose={mockOnClose}
                onConfirm={mockOnConfirm}
                title="Test Title"
                content="Test Content"
            />
        )

        fireEvent.click(screen.getByText('Yes'))
        expect(mockOnConfirm).toHaveBeenCalledTimes(1)
    })
})
