import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Search from './Search'

describe('Search', () => {
    test('renders the search input with placeholder', () => {
        render(<Search onSearch={jest.fn()} />)

        const inputElement = screen.getByPlaceholderText('Search...')
        expect(inputElement).toBeInTheDocument()
    })

    test('updates input value on change and calls onSearch', () => {
        const mockOnSearch = jest.fn()
        render(<Search onSearch={mockOnSearch} />)

        const inputElement = screen.getByPlaceholderText('Search...')
        fireEvent.change(inputElement, { target: { value: 'test' } })

        expect(inputElement.value).toBe('test')
        expect(mockOnSearch).toHaveBeenCalledWith('test')
    })

    test('calls onSearch with the correct value multiple times', () => {
        const mockOnSearch = jest.fn()
        render(<Search onSearch={mockOnSearch} />)

        const inputElement = screen.getByPlaceholderText('Search...')

        fireEvent.change(inputElement, { target: { value: 'a' } })
        fireEvent.change(inputElement, { target: { value: 'ab' } })
        fireEvent.change(inputElement, { target: { value: 'abc' } })

        expect(inputElement.value).toBe('abc')
        expect(mockOnSearch).toHaveBeenCalledTimes(3)
        expect(mockOnSearch).toHaveBeenCalledWith('a')
        expect(mockOnSearch).toHaveBeenCalledWith('ab')
        expect(mockOnSearch).toHaveBeenCalledWith('abc')
    })
})
