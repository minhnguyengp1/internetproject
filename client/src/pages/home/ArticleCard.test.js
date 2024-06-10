import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import ArticleCard from './ArticleCard'

describe('ArticleCard component', () => {
    const props = {
        title: 'Test Title',
        img: 'test-image-url.jpg',
        id: '1',
    }

    test('renders the ArticleCard component correctly', () => {
        render(
            <Router>
                <ArticleCard {...props} />
            </Router>
        )

        // Check if the title is rendered
        expect(screen.getByText('Test Title')).toBeInTheDocument()

        // Check if the image is rendered with the correct src and alt attributes
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

        // Check if the link has the correct href attribute
        const linkElement = screen.getByRole('link')
        expect(linkElement).toHaveAttribute('href', '/article/1')
    })
})
