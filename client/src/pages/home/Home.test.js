import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Home from './Home'
import { SearchProvider } from '../../context/SearchContext'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import { BrowserRouter as Router } from 'react-router-dom'

const renderWithProviders = (ui) => {
    return render(
        <Provider store={store}>
            <SearchProvider>
                <Router>{ui}</Router>
            </SearchProvider>
        </Provider>
    )
}

describe('Home Component', () => {
    it('renders the component and its children correctly', () => {
        renderWithProviders(<Home />)

        // Check if Footer is rendered
        expect(screen.getByText(/Über uns/i)).toBeInTheDocument()
    })

    it('handles category selection', () => {
        renderWithProviders(<Home />)

        const categoryButton = screen.getByText('Elektronik') // Adjust based on your SidebarMenu options
        fireEvent.click(categoryButton)

        expect(screen.getByText(/Kategorie: Elektronik/i)).toBeInTheDocument()
    })

    it('handles search term changes', () => {
        renderWithProviders(<Home />)

        const searchInput = screen.getByPlaceholderText('input search text') // Assuming Header has a search input
        fireEvent.change(searchInput, { target: { value: 'Test Search' } })

        // Assuming Header or another component shows search term
        expect(screen.getByDisplayValue('Test Search')).toBeInTheDocument()
    })
})
