import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ArticleCard from './ArticleCard'

describe('ArticleCard', () => {
    it('renders correctly with given props', () => {
        const title = 'Test Article'
        const img = 'test-image.jpg'

        render(<ArticleCard title={title} img={img} />)

        const imageElement = screen.getByRole('img')
        const titleElement = screen.getByText(title)

        expect(imageElement).toBeInTheDocument()
        expect(imageElement).toHaveAttribute('src', img)
        expect(imageElement).toHaveAttribute('alt', title)

        expect(titleElement).toBeInTheDocument()
        expect(titleElement).toHaveTextContent(title)
    })
})
