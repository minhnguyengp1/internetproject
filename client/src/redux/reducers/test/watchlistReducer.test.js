import {
    addToWatchlistReducer,
    fetchUserWatchlistReducer,
    removeFromWatchlistReducer,
} from '../watchlistReducer'
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

describe('Watchlist Reducers', () => {
    describe('addToWatchlistReducer', () => {
        const initialState = {
            loading: false,
            success: false,
            error: null,
        }

        it('should return the initial state', () => {
            expect(addToWatchlistReducer(undefined, {})).toEqual(initialState)
        })

        it('should handle ADD_TO_WATCHLIST_REQUEST', () => {
            expect(
                addToWatchlistReducer(initialState, {
                    type: ADD_TO_WATCHLIST_REQUEST,
                })
            ).toEqual({
                ...initialState,
                loading: true,
            })
        })

        it('should handle ADD_TO_WATCHLIST_SUCCESS', () => {
            expect(
                addToWatchlistReducer(initialState, {
                    type: ADD_TO_WATCHLIST_SUCCESS,
                })
            ).toEqual({
                ...initialState,
                loading: false,
                success: true,
            })
        })

        it('should handle ADD_TO_WATCHLIST_FAIL', () => {
            const payload = 'Error adding to watchlist'
            expect(
                addToWatchlistReducer(initialState, {
                    type: ADD_TO_WATCHLIST_FAIL,
                    payload,
                })
            ).toEqual({
                ...initialState,
                loading: false,
                error: payload,
            })
        })
    })

    describe('fetchUserWatchlistReducer', () => {
        const initialState = {
            loading: false,
            watchlist: [],
            error: null,
        }

        it('should return the initial state', () => {
            expect(fetchUserWatchlistReducer(undefined, {})).toEqual(
                initialState
            )
        })

        it('should handle FETCH_WATCHLIST_REQUEST', () => {
            expect(
                fetchUserWatchlistReducer(initialState, {
                    type: FETCH_WATCHLIST_REQUEST,
                })
            ).toEqual({
                ...initialState,
                loading: true,
            })
        })

        it('should handle FETCH_WATCHLIST_SUCCESS', () => {
            const payload = [
                { id: 1, title: 'Article 1' },
                { id: 2, title: 'Article 2' },
            ]
            expect(
                fetchUserWatchlistReducer(initialState, {
                    type: FETCH_WATCHLIST_SUCCESS,
                    payload,
                })
            ).toEqual({
                ...initialState,
                loading: false,
                watchlist: payload,
            })
        })

        it('should handle FETCH_WATCHLIST_FAIL', () => {
            const payload = 'Error fetching watchlist'
            expect(
                fetchUserWatchlistReducer(initialState, {
                    type: FETCH_WATCHLIST_FAIL,
                    payload,
                })
            ).toEqual({
                ...initialState,
                loading: false,
                error: payload,
            })
        })
    })

    describe('removeFromWatchlistReducer', () => {
        const initialState = {
            loading: false,
            error: null,
        }

        it('should return the initial state', () => {
            expect(removeFromWatchlistReducer(undefined, {})).toEqual(
                initialState
            )
        })

        it('should handle REMOVE_FROM_WATCHLIST_REQUEST', () => {
            expect(
                removeFromWatchlistReducer(initialState, {
                    type: REMOVE_FROM_WATCHLIST_REQUEST,
                })
            ).toEqual({
                ...initialState,
                loading: true,
            })
        })

        it('should handle REMOVE_FROM_WATCHLIST_SUCCESS', () => {
            expect(
                removeFromWatchlistReducer(initialState, {
                    type: REMOVE_FROM_WATCHLIST_SUCCESS,
                })
            ).toEqual({
                ...initialState,
                loading: false,
            })
        })

        it('should handle REMOVE_FROM_WATCHLIST_FAIL', () => {
            const payload = 'Error removing from watchlist'
            expect(
                removeFromWatchlistReducer(initialState, {
                    type: REMOVE_FROM_WATCHLIST_FAIL,
                    payload,
                })
            ).toEqual({
                ...initialState,
                loading: false,
                error: payload,
            })
        })
    })
})
