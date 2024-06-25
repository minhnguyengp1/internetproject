import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import ArticleDetails from './ArticleDetails'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import {
    fetchArticleById,
    fetchUserWatchlist,
    addToWatchlist,
    removeFromWatchlist,
} from '../../redux/actions/watchlistActions.js'

jest.mock('../../components/Header/Header.jsx', () => () => <div>Header</div>)

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockArticle = {
    id: 1,
    title: 'Test Article',
    description: 'This is a test article.',
    price: 100,
    type: 'Sell',
    city: 'Test City',
    imgUrls: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
    ],
}

const initialState = {
    articleDetails: { article: mockArticle, loading: false, error: null },
    fetchUserWatchlist: {
        watchlist: [{ articleId: 1 }],
        loading: false,
        error: null,
    },
}

const store = mockStore(initialState)

describe('ArticleDetails', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders loading state correctly', () => {
        store.dispatch = jest.fn()
        const loadingState = {
            ...initialState,
            articleDetails: { article: null, loading: true, error: null },
        }
        const loadingStore = mockStore(loadingState)
        render(
            <Provider store={loadingStore}>
                <MemoryRouter initialEntries={['/article/1']}>
                    <Routes>
                        <Route
                            path="/article/:articleId"
                            element={<ArticleDetails />}
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    test('renders error state correctly', () => {
        const errorState = {
            ...initialState,
            articleDetails: {
                article: null,
                loading: false,
                error: 'Error loading article',
            },
        }
        const errorStore = mockStore(errorState)
        render(
            <Provider store={errorStore}>
                <MemoryRouter initialEntries={['/article/1']}>
                    <Routes>
                        <Route
                            path="/article/:articleId"
                            element={<ArticleDetails />}
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('Error loading article')).toBeInTheDocument()
    })

    test('renders article details correctly', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/article/1']}>
                    <Routes>
                        <Route
                            path="/article/:articleId"
                            element={<ArticleDetails />}
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('Test Article')).toBeInTheDocument()
        expect(screen.getByText('This is a test article.')).toBeInTheDocument()
        expect(screen.getByText('100 € Sell')).toBeInTheDocument()
        expect(screen.getByText('Test City')).toBeInTheDocument()
        expect(screen.getAllByRole('img')).toHaveLength(1)
    })

    test('handles image navigation correctly', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/article/1']}>
                    <Routes>
                        <Route
                            path="/article/:articleId"
                            element={<ArticleDetails />}
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        const nextButton = screen.getByTestId('nextBtn', { name: /next/i })
        fireEvent.click(nextButton)
        expect(screen.getAllByRole('img')[0]).toHaveAttribute(
            'src',
            'https://via.placeholder.com/150'
        )

        const prevButton = screen.getByTestId('prevBtn', { name: /prev/i })
        fireEvent.click(prevButton)
        expect(screen.getAllByRole('img')[0]).toHaveAttribute(
            'src',
            'https://via.placeholder.com/150'
        )
    })
})
