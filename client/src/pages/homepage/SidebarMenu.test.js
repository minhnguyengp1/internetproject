import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SidebarMenu from './SidebarMenu'
import { categories } from '../../assets/categories'

describe('SidebarMenu', () => {
    categories.forEach((category) => {
        it(`calls onSelectCategory with "${category.label}" when "${category.label}" category is clicked`, () => {
            const handleSelectCategory = jest.fn()
            render(<SidebarMenu onSelectCategory={handleSelectCategory} />)

            const categoryElement = screen.getByText(category.label)
            fireEvent.click(categoryElement)

            const expectedArgument =
                category.label === 'All Categories' ? null : category.label
            expect(handleSelectCategory).toHaveBeenCalledWith(expectedArgument)
        })
    })
})
