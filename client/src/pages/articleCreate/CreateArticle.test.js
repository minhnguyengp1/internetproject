import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import CreateArticle from './CreateArticle'
import { SearchProvider } from '../../context/SearchContext' // Adjust the import path as necessary
import { Provider } from 'react-redux'
import store from '../../redux/store' // Adjust the import path as necessary
import { BrowserRouter as Router } from 'react-router-dom' // Import BrowserRouter
// Mock axios
jest.mock('axios')

const renderWithProviders = (ui) => {
    return render(
        <Provider store={store}>
            <SearchProvider>
                <Router>{ui}</Router>
            </SearchProvider>
        </Provider>
    )
}

describe('CreateArticle Component', () => {
    it('renders the form correctly', () => {
        renderWithProviders(<CreateArticle />)
        expect(screen.getByLabelText(/Titel/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Preis/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Kategorie/i)).toBeInTheDocument()
        //expect(screen.getAllByLabelText(/Type/i)).toBeInTheDocument()
        screen.getAllByLabelText(/Type/i).forEach((element) => {
            expect(element).toBeInTheDocument()
        })
        expect(screen.getByLabelText(/Beschreibung/i)).toBeInTheDocument()
        expect(screen.getByText(/Drag 'n' drop/i)).toBeInTheDocument()
        expect(screen.getByText(/Fertig!/i)).toBeInTheDocument()
    })

    it('shows validation errors on form submission with empty fields', async () => {
        renderWithProviders(<CreateArticle />)

        fireEvent.click(screen.getByText(/Fertig!/i))

        await waitFor(() => {
            expect(screen.getAllByText(/This field is required/i)).toHaveLength(
                4
            )
        })
    })

    it('submits the form with valid data', async () => {
        axios.post.mockResolvedValue({ data: { message: 'Success' } })

        renderWithProviders(<CreateArticle />)

        fireEvent.input(screen.getByLabelText(/Titel/i), {
            target: { value: 'Test Title' },
        })
        fireEvent.input(screen.getByLabelText(/Preis/i), {
            target: { value: '100' },
        })
        fireEvent.change(screen.getByLabelText(/Kategorie/i), {
            target: { value: 'Elektronik' },
        })
        fireEvent.click(screen.getByDisplayValue(/Festpreis/i))
        fireEvent.input(screen.getByLabelText(/Beschreibung/i), {
            target: { value: 'Test Description' },
        })

        fireEvent.click(screen.getByText(/Fertig!/i))

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:5000/api/createArticle',
                {
                    title: 'Test Title',
                    price: '100',
                    category: 'Elektronik',
                    type: 'Festpreis',
                    description: 'Test Description',
                }
            )
        })

        expect(axios.post).toHaveBeenCalledTimes(1)
    })

    it('handles API errors', async () => {
        axios.post.mockRejectedValue({
            response: { data: { message: 'Error occurred' } },
        })

        renderWithProviders(<CreateArticle />)

        fireEvent.input(screen.getByLabelText(/Titel/i), {
            target: { value: 'Test Title' },
        })
        fireEvent.input(screen.getByLabelText(/Preis/i), {
            target: { value: '100' },
        })
        fireEvent.change(screen.getByLabelText(/Kategorie/i), {
            target: { value: 'Elektronik' },
        })
        fireEvent.click(screen.getByDisplayValue(/Festpreis/i))
        fireEvent.input(screen.getByLabelText(/Beschreibung/i), {
            target: { value: 'Test Description' },
        })

        fireEvent.click(screen.getByText(/Fertig!/i))

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:5000/api/createArticle',
                {
                    title: 'Test Title',
                    price: '100',
                    category: 'Elektronik',
                    type: 'Festpreis',
                    description: 'Test Description',
                }
            )
        })

        expect(axios.post).toHaveBeenCalledTimes(1)
    })
})
