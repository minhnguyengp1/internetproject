import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Home from './Home'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import { BrowserRouter as Router } from 'react-router-dom'

const renderWithProviders = (ui) => {
    return render(
        <Provider store={store}>
            <Router>{ui}</Router>
        </Provider>
    )
}

describe('Home Component', () => {
    it('renders the component and its children correctly', () => {
        renderWithProviders(<Home />)

        expect(screen.getByText(/Mein Profil/i)).toBeInTheDocument()
    })

    it('handles search term changes', () => {
        renderWithProviders(<Home />)

        const searchInput = screen.getByPlaceholderText('Search...')
        fireEvent.change(searchInput, { target: { value: 'Test Search' } })

        expect(screen.getByDisplayValue('Test Search')).toBeInTheDocument()
    })
})
