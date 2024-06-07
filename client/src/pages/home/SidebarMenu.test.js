import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SidebarMenu from './SidebarMenu'
import { categories } from '../../assets/categories.js'

// Mock categories for testing
jest.mock('../../assets/categories.js', () => ({
    categories: [
        { label: 'Category 1' },
        { label: 'Category 2' },
        { label: 'All Categories' },
    ],
}))

describe('SidebarMenu component', () => {
    const mockOnSelectCategory = jest.fn()

    beforeEach(() => {
        mockOnSelectCategory.mockClear()
    })

    test('selecting "All Categories" sets selected category to null', () => {
        const { getByText } = render(
            <SidebarMenu onSelectCategory={mockOnSelectCategory} />
        )

        // Click on "All Categories"
        fireEvent.click(getByText('All Categories'))

        // Check if the category was set to null
        expect(mockOnSelectCategory).toHaveBeenCalledWith(null)
    })

    test('selecting a specific category sets the selected category', () => {
        const { getByText } = render(
            <SidebarMenu onSelectCategory={mockOnSelectCategory} />
        )

        // Click on "Category 1"
        fireEvent.click(getByText('Category 1'))

        // Check if the category was set to "Category 1"
        expect(mockOnSelectCategory).toHaveBeenCalledWith('Category 1')
    })

    test('selecting another specific category sets the selected category', () => {
        const { getByText } = render(
            <SidebarMenu onSelectCategory={mockOnSelectCategory} />
        )

        // Click on "Category 2"
        fireEvent.click(getByText('Category 2'))

        // Check if the category was set to "Category 2"
        expect(mockOnSelectCategory).toHaveBeenCalledWith('Category 2')
    })
})
