import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import FilterSidebar from './FilterSidebar'

jest.mock(
    '../CategoryDropdown/CategoryDropdown.jsx',
    () =>
        ({ selectedCategory, setSelectedCategory }) =>
            (
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                </select>
            )
)

jest.mock(
    '../CityDropdown/CityDropdown.jsx',
    () =>
        ({ selectedCity, setSelectedCity }) =>
            (
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                >
                    <option value="">Select City</option>
                    <option value="city1">City 1</option>
                    <option value="city2">City 2</option>
                </select>
            )
)

describe('FilterSidebar', () => {
    const setup = (initialEntries = ['/search']) => {
        return render(
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>
                    <Route path="/search" element={<FilterSidebar />} />
                </Routes>
            </MemoryRouter>
        )
    }

    test('updates price state on input change', () => {
        setup()

        const minPriceInput = screen.getByPlaceholderText('Von')
        fireEvent.change(minPriceInput, { target: { value: '20' } })
        expect(minPriceInput.value).toBe('20')

        const maxPriceInput = screen.getByPlaceholderText('Bis')
        fireEvent.change(maxPriceInput, { target: { value: '200' } })
        expect(maxPriceInput.value).toBe('200')
    })

    test('updates category state on dropdown change', () => {
        setup()

        const categoryDropdown = screen.getByText('Select Category')
        fireEvent.change(categoryDropdown, { target: { value: 'Elektronik' } })
        expect(categoryDropdown.value).toBe('Elektronik')
    })

    test('updates city state on dropdown change', () => {
        setup()

        const cityDropdown = screen.getByText('Select City')
        fireEvent.change(cityDropdown, { target: { value: 'Stuttgart' } })
        expect(cityDropdown.value).toBe('Stuttgart')
    })

    // test('navigates to the correct URL on apply filter', () => {
    //     const navigateMock = jest.fn()
    //     jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(
    //         navigateMock
    //     )

    //     setup()

    //     const applyButton = screen.getByText('Apply')
    //     fireEvent.click(applyButton)

    //     expect(navigateMock).toHaveBeenCalledWith('/search')
    // })
})
