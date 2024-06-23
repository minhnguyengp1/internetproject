import {
    ADD_TO_WATCHLIST_REQUEST,
    ADD_TO_WATCHLIST_SUCCESS,
    ADD_TO_WATCHLIST_FAIL,
    REMOVE_FROM_WATCHLIST_REQUEST,
    REMOVE_FROM_WATCHLIST_SUCCESS,
    REMOVE_FROM_WATCHLIST_FAIL,
    FETCH_WATCHLIST_REQUEST,
    FETCH_WATCHLIST_SUCCESS,
    FETCH_WATCHLIST_FAIL
} from '../constants/watchlistActionTypes.js'

export const addToWatchlistReducer = (state = {
    loading: false,
    success: false,
    error: null
}, action) => {
    switch (action.type) {
        case ADD_TO_WATCHLIST_REQUEST:
            return { ...state, loading: true, success: false, error: null }

        case ADD_TO_WATCHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null
            }

        case ADD_TO_WATCHLIST_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const fetchUserWatchlistReducer = (state = {
    loading: false,
    watchlist: [],
    error: null
}, action) => {
    switch (action.type) {
        case FETCH_WATCHLIST_REQUEST:
            return { ...state, loading: true, error: null }

        case FETCH_WATCHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                watchlist: action.payload,
                error: null
            }

        case FETCH_WATCHLIST_FAIL:
            return {
                ...state,
                loading: false,
                watchlist: [],
                error: action.payload
            }

        default:
            return state
    }
}

export const removeFromWatchlistReducer = (state = {
    loading: false,
    error: null
}, action) => {
    switch (action.type) {
        case REMOVE_FROM_WATCHLIST_REQUEST:
            return { ...state, loading: true, error: null }

        case REMOVE_FROM_WATCHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            }

        case REMOVE_FROM_WATCHLIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}