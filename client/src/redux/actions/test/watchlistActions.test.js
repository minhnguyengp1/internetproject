import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import axios from 'axios'
import {
    ADD_TO_WATCHLIST_REQUEST,
    ADD_TO_WATCHLIST_SUCCESS,
    ADD_TO_WATCHLIST_FAIL,
    REMOVE_FROM_WATCHLIST_REQUEST,
    REMOVE_FROM_WATCHLIST_SUCCESS,
    REMOVE_FROM_WATCHLIST_FAIL,
    FETCH_WATCHLIST_REQUEST,
    FETCH_WATCHLIST_SUCCESS,
    FETCH_WATCHLIST_FAIL,
} from '../../constants/watchlistActionTypes'
import * as actions from '../watchlistActions'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
    userLogin: {
        accessToken: 'fakeAccessToken',
        userId: 1,
    },
}

describe('Watchlist Actions', () => {
    let store

    beforeEach(() => {
        store = mockStore(initialState)
        jest.clearAllMocks()
    })

    test('addToWatchlist creates ADD_TO_WATCHLIST_SUCCESS when adding to watchlist has been done', async () => {
        axios.post.mockResolvedValue({})

        const expectedActions = [
            { type: ADD_TO_WATCHLIST_REQUEST },
            { type: ADD_TO_WATCHLIST_SUCCESS },
        ]

        await store.dispatch(actions.addToWatchlist(2))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('addToWatchlist creates ADD_TO_WATCHLIST_FAIL when adding to watchlist fails', async () => {
        const mockError = 'Failed to add to watchlist'
        axios.post.mockRejectedValue({
            response: { data: { message: mockError } },
        })

        const expectedActions = [
            { type: ADD_TO_WATCHLIST_REQUEST },
            { type: ADD_TO_WATCHLIST_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.addToWatchlist(2))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('removeFromWatchlist creates REMOVE_FROM_WATCHLIST_SUCCESS when removing from watchlist has been done', async () => {
        axios.post.mockResolvedValue({})

        const expectedActions = [
            { type: REMOVE_FROM_WATCHLIST_REQUEST },
            { type: REMOVE_FROM_WATCHLIST_SUCCESS },
        ]

        await store.dispatch(actions.removeFromWatchlist(2))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('removeFromWatchlist creates REMOVE_FROM_WATCHLIST_FAIL when removing from watchlist fails', async () => {
        const mockError = 'Failed to remove from watchlist'
        axios.post.mockRejectedValue({
            response: { data: { message: mockError } },
        })

        const expectedActions = [
            { type: REMOVE_FROM_WATCHLIST_REQUEST },
            { type: REMOVE_FROM_WATCHLIST_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.removeFromWatchlist(2))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchUserWatchlist creates FETCH_WATCHLIST_SUCCESS when fetching watchlist has been done', async () => {
        const mockData = [{ id: 1, title: 'Test Article' }]
        axios.get.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: FETCH_WATCHLIST_REQUEST },
            { type: FETCH_WATCHLIST_SUCCESS, payload: mockData },
        ]

        await store.dispatch(actions.fetchUserWatchlist())
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchUserWatchlist creates FETCH_WATCHLIST_FAIL when fetching watchlist fails', async () => {
        const mockError = 'Failed to fetch watchlist'
        axios.get.mockRejectedValue({
            response: { data: { message: mockError } },
        })

        const expectedActions = [
            { type: FETCH_WATCHLIST_REQUEST },
            { type: FETCH_WATCHLIST_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.fetchUserWatchlist())
        expect(store.getActions()).toEqual(expectedActions)
    })
})
