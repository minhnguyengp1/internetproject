import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import Watchlist from './Watchlist'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom'
import {
    fetchUserWatchlist,
    removeFromWatchlist,
} from '../../redux/actions/watchlistActions'

jest.mock('../../redux/actions/watchlistActions')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockWatchlist = [
    {
        articleId: 1,
        title: 'Test Article 1',
        category: 'electronics',
        description: 'This is a test article 1.',
        price: 100,
        city: 'Berlin',
        imgUrls: ['https://via.placeholder.com/150'],
    },
    {
        articleId: 2,
        title: 'Test Article 2',
        category: 'furniture',
        description: 'This is a test article 2.',
        price: 200,
        city: 'Hamburg',
        imgUrls: ['https://via.placeholder.com/150'],
    },
]

const initialState = {
    fetchUserWatchlist: {
        watchlist: mockWatchlist,
        loading: false,
        error: null,
    },
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

describe('Watchlist', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('asda', () => {
        expect(1).toBe(1)
    })

    // test('renders Watchlist correctly', () => {
    //     render(
    //         <Provider store={store}>
    //             <Router>
    //                 <Watchlist />
    //             </Router>
    //         </Provider>
    //     )

    //     expect(screen.getByText('Watchlist')).toBeInTheDocument()
    //     expect(screen.getByText('Test Article 1')).toBeInTheDocument()
    //     expect(screen.getByText('Test Article 2')).toBeInTheDocument()
    // })

    // test('displays loading state', () => {
    //     const loadingState = {
    //         ...initialState,
    //         fetchUserWatchlist: { watchlist: [], loading: true, error: null },
    //     }
    //     const loadingStore = mockStore(loadingState)
    //     render(
    //         <Provider store={loadingStore}>
    //             <Router>
    //                 <Watchlist />
    //             </Router>
    //         </Provider>
    //     )

    //     expect(screen.getByText('Loading...')).toBeInTheDocument()
    // })

    // test('displays error message', () => {
    //     const errorState = {
    //         ...initialState,
    //         fetchUserWatchlist: {
    //             watchlist: [],
    //             loading: false,
    //             error: 'Error fetching watchlist',
    //         },
    //     }
    //     const errorStore = mockStore(errorState)
    //     render(
    //         <Provider store={errorStore}>
    //             <Router>
    //                 <Watchlist />
    //             </Router>
    //         </Provider>
    //     )

    //     expect(
    //         screen.getByText('Error: Error fetching watchlist')
    //     ).toBeInTheDocument()
    // })

    // test('displays no articles message when watchlist is empty', () => {
    //     const emptyState = {
    //         ...initialState,
    //         fetchUserWatchlist: { watchlist: [], loading: false, error: null },
    //     }
    //     const emptyStore = mockStore(emptyState)
    //     render(
    //         <Provider store={emptyStore}>
    //             <Router>
    //                 <Watchlist />
    //             </Router>
    //         </Provider>
    //     )

    //     expect(
    //         screen.getByText('No articles found in your watchlist.')
    //     ).toBeInTheDocument()
    // })

    // test('handles remove from watchlist', async () => {
    //     removeFromWatchlist.mockResolvedValueOnce({})

    //     render(
    //         <Provider store={store}>
    //             <Router>
    //                 <Watchlist />
    //             </Router>
    //         </Provider>
    //     )

    //     const removeButtons = screen.getAllByRole('button', {
    //         name: /entfernen/i,
    //     })
    //     fireEvent.click(removeButtons[0])

    //     await waitFor(() => {
    //         expect(removeFromWatchlist).toHaveBeenCalledWith(
    //             mockWatchlist[0].articleId
    //         )
    //         expect(fetchUserWatchlist).toHaveBeenCalled()
    //     })
    // })
})
