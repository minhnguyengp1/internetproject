import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import UpdateArticle from './UpdateArticle'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom'
import {
    fetchArticleById,
    updateArticle,
    resetArticleUpdate,
} from '../../redux/actions/articleActions'

jest.mock('../../redux/actions/articleActions')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockArticle = {
    id: 1,
    title: 'Test Article',
    category: 'electronics',
    price: 100,
    type: 'Festpreis',
    description: 'This is a test article.',
    city: 'Berlin',
    imgUrls: ['https://via.placeholder.com/150'],
}

const initialState = {
    articleDetails: { article: mockArticle, loading: false, error: null },
    articleUpdate: { success: false },
    userLogin: { isAuthenticated: true },
    userDetails: {
        fullName: '',
        street: '',
        city: '',
        postalCode: '',
        img: '',
    },
}

const store = mockStore(initialState)

describe('UpdateArticle', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders UpdateArticle form correctly', () => {
        render(
            <Provider store={store}>
                <Router>
                    <UpdateArticle />
                </Router>
            </Provider>
        )

        expect(screen.getByLabelText('Titel')).toBeInTheDocument()
        expect(screen.getByLabelText('Kategorie')).toBeInTheDocument()
        expect(screen.getByLabelText('Preis')).toBeInTheDocument()
        expect(screen.getByLabelText('Beschreibung')).toBeInTheDocument()
        expect(screen.getByLabelText('Stadt')).toBeInTheDocument()
        expect(screen.getByText('Festpreis')).toBeInTheDocument()
        expect(screen.getByText('Verhandelbar')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /anzeige aktualisieren/i })
        ).toBeInTheDocument()
    })
})
