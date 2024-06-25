import React from 'react'
import { render, screen } from '@testing-library/react'
import Message from './Message'

describe('Message', () => {
    const message = {
        text: 'Hello, this is a test message!',
        createdAt: '2 hours ago',
    }

    test('renders the message correctly', () => {
        render(<Message message={message} own={false} />)

        expect(screen.getByText(message.text)).toBeInTheDocument()
        expect(screen.getByText(message.createdAt)).toBeInTheDocument()
    })

    test('applies the own class when own prop is true', () => {
        const { container } = render(<Message message={message} own={true} />)
        expect(container.firstChild).toHaveClass('message own')
    })

    test('does not apply the own class when own prop is false', () => {
        const { container } = render(<Message message={message} own={false} />)
        expect(container.firstChild).toHaveClass('message')
        expect(container.firstChild).not.toHaveClass('own')
    })
})
