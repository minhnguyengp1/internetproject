import React from 'react'
import { render, screen } from '@testing-library/react'
import SearchResultsLayout from './SearchResultsLayout'

jest.mock('../../components/Header/Header.jsx', () => () => <div>Header</div>)
jest.mock('../../components/FilterSidebar/FilterSidebar.jsx', () => () => (
    <div>FilterSidebar</div>
))

describe('SearchResultsLayout', () => {
    test('renders the Header and FilterSidebar components', () => {
        render(
            <SearchResultsLayout>
                <div>Child Content</div>
            </SearchResultsLayout>
        )

        expect(screen.getByText('Header')).toBeInTheDocument()
        expect(screen.getByText('FilterSidebar')).toBeInTheDocument()
    })

    test('renders children correctly', () => {
        render(
            <SearchResultsLayout>
                <div>Child Content</div>
            </SearchResultsLayout>
        )

        expect(screen.getByText('Child Content')).toBeInTheDocument()
    })

    test('applies the correct layout structure', () => {
        const { container } = render(
            <SearchResultsLayout>
                <div>Child Content</div>
            </SearchResultsLayout>
        )

        expect(container.firstChild).toHaveClass('search-results-layout')
        expect(
            container.querySelector('.search-results-layout__content')
        ).toBeInTheDocument()
        expect(
            container.querySelector('.search-results-layout__main-content')
        ).toBeInTheDocument()
    })
})
