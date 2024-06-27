import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import OtherUserView from './OtherUserView'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import '@testing-library/jest-dom'

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        }
    }

jest.mock('../../components/Header/Header.jsx', () => () => <div>Header</div>)
jest.mock('../../components/ArticleCard/ArticleCard.jsx', () => (props) => (
    <div>
        <div>{props.title}</div>
        <div>{props.description}</div>
    </div>
))

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockStrangerDetails = {
    userId: 2,
    fullName: 'John Doe',
    street: '123 Main St',
    city: 'Anytown',
    postalCode: '12345',
    img: 'https://via.placeholder.com/150',
    activeSince: '2020-01-01',
}

const mockStrangerArticles = [
    {
        articleId: 1,
        title: 'Test Article 1',
        description: 'This is a test article 1.',
        price: 100,
        category: 'Electronics',
        city: 'Anytown',
        imgUrls: ['https://via.placeholder.com/150'],
    },
    {
        articleId: 2,
        title: 'Test Article 2',
        description: 'This is a test article 2.',
        price: 200,
        category: 'Furniture',
        city: 'Othertown',
        imgUrls: ['https://via.placeholder.com/150'],
    },
]

const initialState = {
    userLogin: { userId: 1 },
    strangerDetails: {
        strangerDetails: mockStrangerDetails,
        loading: false,
        error: null,
    },
    strangerArticles: {
        strangerArticles: mockStrangerArticles,
        loading: false,
        error: null,
    },
    reviewSubmit: { loading: false, error: null },
    followUser: { loading: false, success: false },
    unfollowUser: { loading: false, success: false },
    followingList: { following: [{ userId: 2 }] },
}

const store = mockStore(initialState)

describe('OtherUserView', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders loading state correctly', () => {
        const loadingState = {
            ...initialState,
            strangerDetails: {
                strangerDetails: null,
                loading: true,
                error: null,
            },
            strangerArticles: {
                strangerArticles: [],
                loading: true,
                error: null,
            },
        }
        const loadingStore = mockStore(loadingState)
        render(
            <Provider store={loadingStore}>
                <MemoryRouter initialEntries={['/user/2']}>
                    <Routes>
                        <Route
                            path="/user/:strangerId"
                            element={<OtherUserView />}
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getAllByText('Loading...')).toHaveLength(1)
    })

    test('renders stranger details and articles correctly', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/user/2']}>
                    <Routes>
                        <Route
                            path="/user/:strangerId"
                            element={<OtherUserView />}
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('John Doe')).toBeInTheDocument()

        expect(screen.getByText('Test Article 1')).toBeInTheDocument()
        expect(
            screen.getByText('This is a test article 1.')
        ).toBeInTheDocument()
        expect(screen.getByText('Test Article 2')).toBeInTheDocument()
        expect(
            screen.getByText('This is a test article 2.')
        ).toBeInTheDocument()
    })
})
