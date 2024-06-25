import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ReviewCard from './ReviewCard'

describe('ReviewCard', () => {
    const mockReview = {
        id: '1',
        author: 'John Doe',
        text: 'This is a test review.',
        rating: 'Excellent',
    }

    test('renders correctly with given props', () => {
        render(
            <MemoryRouter>
                <ReviewCard
                    id={mockReview.id}
                    author={mockReview.author}
                    text={mockReview.text}
                    rating={mockReview.rating}
                />
            </MemoryRouter>
        )

        expect(screen.getByText(mockReview.author)).toBeInTheDocument()
        expect(screen.getByText(mockReview.text)).toBeInTheDocument()
        expect(screen.getByText(mockReview.rating)).toBeInTheDocument()
    })

    test('renders a link to the correct review page', () => {
        render(
            <MemoryRouter>
                <ReviewCard
                    id={mockReview.id}
                    author={mockReview.author}
                    text={mockReview.text}
                    rating={mockReview.rating}
                />
            </MemoryRouter>
        )

        const linkElement = screen.getByRole('link')
        expect(linkElement).toHaveAttribute('href', `/review/${mockReview.id}`)
    })

    test('applies the correct rating class', () => {
        render(
            <MemoryRouter>
                <ReviewCard
                    id={mockReview.id}
                    author={mockReview.author}
                    text={mockReview.text}
                    rating={mockReview.rating}
                />
            </MemoryRouter>
        )

        const ratingElement = screen.getByText(mockReview.rating)
        expect(ratingElement).toHaveClass('rating')
        expect(ratingElement).toHaveClass(mockReview.rating.toLowerCase())
    })
})
