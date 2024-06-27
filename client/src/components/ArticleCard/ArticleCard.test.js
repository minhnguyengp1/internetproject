import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import ArticleCard from './ArticleCard'

describe('ArticleCard component', () => {
    const props = {
        title: 'Test Title',
        img: 'test-image-url.jpg',
        id: '1'
    }

    test('renders the ArticleCard component correctly', () => {
        render(
            <Router>
                <ArticleCard {...props} />
            </Router>
        )

        expect(screen.getByText('Test Title')).toBeInTheDocument()

        const imgElement = screen.getByAltText('Test Title')
        expect(imgElement).toBeInTheDocument()
        expect(imgElement).toHaveAttribute('src', 'test-image-url.jpg')
    })

    test('navigates to the correct URL when clicked', () => {
        render(
            <Router>
                <ArticleCard {...props} />
            </Router>
        )

        const linkElement = screen.getByRole('link')
        expect(linkElement).toHaveAttribute('href', '/article/1')
    })
})
