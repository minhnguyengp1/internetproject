import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SidebarMenu from './SidebarMenu'
import { categories } from '../../assets/categories.js'

// Mock categories for testing
jest.mock('../../assets/categories.js', () => ({
    categories: [
        { label: 'Category 1' },
        { label: 'Category 2' },
        { label: 'Category 3' },
        { label: 'All Categories' },
    ],
}))

describe('SidebarMenu component', () => {
    const mockOnSelectCategory = jest.fn()

    beforeEach(() => {
        mockOnSelectCategory.mockClear()
    })

    it('selecting "All Categories" sets selected category to null', () => {
        const { getByText } = render(
            <SidebarMenu onSelectCategory={mockOnSelectCategory} />
        )

        fireEvent.click(getByText('All Categories'))
        expect(mockOnSelectCategory).toHaveBeenCalledWith(null)
    })

    it('selecting a specific category sets the selected category to "Category 1"', () => {
        const { getByText } = render(
            <SidebarMenu onSelectCategory={mockOnSelectCategory} />
        )

        fireEvent.click(getByText('Category 1'))
        expect(mockOnSelectCategory).toHaveBeenCalledWith('Category 1')
    })

    it('selecting a specific category sets the selected category to "Category 2"', () => {
        const { getByText } = render(
            <SidebarMenu onSelectCategory={mockOnSelectCategory} />
        )

        fireEvent.click(getByText('Category 2'))
        expect(mockOnSelectCategory).toHaveBeenCalledWith('Category 2')
    })

    it('selecting a specific category sets the selected category to "Category 3"', () => {
        const { getByText } = render(
            <SidebarMenu onSelectCategory={mockOnSelectCategory} />
        )

        fireEvent.click(getByText('Category 3'))
        expect(mockOnSelectCategory).toHaveBeenCalledWith('Category 3')
    })

    it('handles undefined selectedItem', () => {
        const { getByText } = render(
            <SidebarMenu onSelectCategory={mockOnSelectCategory} />
        )

        // Click on a non-existing category to trigger undefined selectedItem
        fireEvent.click(getByText('Non Existing Category'))
        expect(mockOnSelectCategory).not.toHaveBeenCalled()
    })
})
