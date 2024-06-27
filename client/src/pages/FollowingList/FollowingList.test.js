import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import FollowingList from './FollowingList'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

jest.mock('../../layouts/UserLayout/UserLayout.jsx', () => ({ children }) => (
    <div>{children}</div>
))

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockFollowingList = [
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
    followingList: {
        following: mockFollowingList,
        loading: false,
        error: null,
    },
}

const store = mockStore(initialState)

describe('FollowingList', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('renders loading state correctly', () => {
        const loadingState = {
            ...initialState,
            followingList: { following: [], loading: true, error: null },
        }
        const loadingStore = mockStore(loadingState)
        render(
            <Provider store={loadingStore}>
                <MemoryRouter>
                    <FollowingList />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    test('renders error state correctly', () => {
        const errorState = {
            ...initialState,
            followingList: {
                following: [],
                loading: false,
                error: 'Error fetching following list',
            },
        }
        const errorStore = mockStore(errorState)
        render(
            <Provider store={errorStore}>
                <MemoryRouter>
                    <FollowingList />
                </MemoryRouter>
            </Provider>
        )

        expect(
            screen.getByText('Error: Error fetching following list')
        ).toBeInTheDocument()
    })

    test('renders following list correctly', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <FollowingList />
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

    test('renders no following message correctly', () => {
        const noFollowingState = {
            ...initialState,
            followingList: { following: [], loading: false, error: null },
        }
        const noFollowingStore = mockStore(noFollowingState)
        render(
            <Provider store={noFollowingStore}>
                <MemoryRouter>
                    <FollowingList />
                </MemoryRouter>
            </Provider>
        )

        expect(
            screen.getByText('Es sind keine Benutzer gefolgt.')
        ).toBeInTheDocument()
    })
})
