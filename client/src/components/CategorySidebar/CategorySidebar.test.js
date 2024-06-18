import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CategorySidebar from './CategorySidebar.jsx'
import { categories } from '../../assets/categories.js'

describe('CategorySidebar', () => {
    const mockOnSelectCategory = jest.fn()

    beforeEach(() => {
        render(<CategorySidebar onSelectCategory={mockOnSelectCategory} />)
        mockOnSelectCategory.mockClear()
    })

    it('renders all categories', () => {
        categories.forEach((category) => {
            expect(screen.getByText(category.label)).toBeInTheDocument()
        })
    })

    it('selects a category on click', () => {
        const categoryToSelect = categories[1]
        userEvent.click(screen.getByText(categoryToSelect.label))
        expect(mockOnSelectCategory).toHaveBeenCalledWith(
            categoryToSelect.label
        )
    })

    it('selects null when "All Categories" is clicked', () => {
        const allCategories = categories.find(
            (category) => category.label === 'All Categories'
        )
        if (allCategories) {
            userEvent.click(screen.getByText('All Categories'))
            expect(mockOnSelectCategory).toHaveBeenCalledWith(null)
        }
    })
})
