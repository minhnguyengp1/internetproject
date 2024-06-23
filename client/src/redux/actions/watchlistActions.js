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
    FETCH_WATCHLIST_FAIL
} from '../constants/watchlistActionTypes.js'

export const addToWatchlist = (articleId) => async (dispatch, getState) => {
    dispatch({ type: ADD_TO_WATCHLIST_REQUEST })

    try {
        const { accessToken } = getState().userLogin
        const { userId } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        await axios.post('http://localhost:5000/api/watchlist/add', { userId, articleId }, config)

        dispatch({ type: ADD_TO_WATCHLIST_SUCCESS })
    } catch (error) {
        dispatch({
            type: ADD_TO_WATCHLIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const removeFromWatchlist = (articleId) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_WATCHLIST_REQUEST })

    try {
        const { accessToken } = getState().userLogin
        const { userId } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        await axios.post('http://localhost:5000/api/watchlist/remove', { userId, articleId }, config)

        dispatch({ type: REMOVE_FROM_WATCHLIST_SUCCESS })
    } catch (error) {
        dispatch({
            type: REMOVE_FROM_WATCHLIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const fetchUserWatchlist = () => async (dispatch, getState) => {
    dispatch({ type: FETCH_WATCHLIST_REQUEST })

    try {
        const { accessToken } = getState().userLogin
        const { userId } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.get(`http://localhost:5000/api/watchlist/${userId}`, config)

        dispatch({ type: FETCH_WATCHLIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: FETCH_WATCHLIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}