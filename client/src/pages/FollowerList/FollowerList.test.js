import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import FollowerList from './FollowerList'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

jest.mock('../../layouts/UserLayout/UserLayout.jsx', () => ({ children }) => (
    <div>{children}</div>
))

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockFollowersList = [
    {
        userId: 1,
        fullName: 'John Doe',
        city: 'Anytown',
        postalCode: '12345',
        street: '123 Main St',
        img: 'https://via.placeholder.com/150',
    },
    {
        userId: 2,
        fullName: 'Jane Smith',
        city: 'Othertown',
        postalCode: '54321',
        street: '456 Side St',
        img: 'https://via.placeholder.com/150',
    },
]

const initialState = {
    followerList: { followers: mockFollowersList, loading: false, error: null },
}

const store = mockStore(initialState)

describe('FollowerList', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders loading state correctly', () => {
        const loadingState = {
            ...initialState,
            followerList: { followers: [], loading: true, error: null },
        }
        const loadingStore = mockStore(loadingState)
        render(
            <Provider store={loadingStore}>
                <MemoryRouter>
                    <FollowerList />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    test('renders error state correctly', () => {
        const errorState = {
            ...initialState,
            followerList: {
                followers: [],
                loading: false,
                error: 'Error fetching follower list',
            },
        }
        const errorStore = mockStore(errorState)
        render(
            <Provider store={errorStore}>
                <MemoryRouter>
                    <FollowerList />
                </MemoryRouter>
            </Provider>
        )

        expect(
            screen.getByText('Error: Error fetching follower list')
        ).toBeInTheDocument()
    })

    test('renders follower list correctly', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <FollowerList />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(
            screen.getByText('Anytown, 12345, 123 Main St')
        ).toBeInTheDocument()
        expect(screen.getByText('Jane Smith')).toBeInTheDocument()
        expect(
            screen.getByText('Othertown, 54321, 456 Side St')
        ).toBeInTheDocument()
    })

    test('renders no followers message correctly', () => {
        const noFollowersState = {
            ...initialState,
            followerList: { followers: [], loading: false, error: null },
        }
        const noFollowersStore = mockStore(noFollowersState)
        render(
            <Provider store={noFollowersStore}>
                <MemoryRouter>
                    <FollowerList />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('Keine Follower gefunden.')).toBeInTheDocument()
    })
})
