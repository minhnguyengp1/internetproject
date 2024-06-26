import * as actionTypes from '../constants/userActionTypes.js'
import axios from 'axios'
import { logout } from './authActions.js'

export const fetchUserDetails = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_USER_DETAILS_REQUEST })

    try {
        const { accessToken } = getState().userLogin
        const { userId } = getState().userLogin

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.get(
            `http://localhost:5000/api/user/${userId}`,
            config
        )

        dispatch({
            type: actionTypes.FETCH_USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_USER_DETAILS_FAILURE,
            payload: { error: 'An error occurred' }
        })
    }
}

export const fetchUserArticles = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_USER_ARTICLES_REQUEST })

    try {
        const { accessToken } = getState().userLogin
        const { userId } = getState().userLogin

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.get(
            `http://localhost:5000/api/user/${userId}/articles`,
            config
        )

        dispatch({
            type: actionTypes.FETCH_USER_ARTICLES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_USER_ARTICLES_FAILURE,
            payload: error.message || 'Failed to fetch user articles'
        })
    }
}

export const updateUserDetails = (formData) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.UPDATE_USER_DETAILS_REQUEST })

    try {
        const { accessToken, userId } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        await axios.put(
            `http://localhost:5000/api/user/${userId}`,
            formData,
            config
        )

        dispatch({
            type: actionTypes.UPDATE_USER_DETAILS_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_USER_DETAILS_FAILURE,
            payload: error.message || 'Failed to update user details'
        })
    }
}

export const deleteUser = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.DELETE_USER_REQUEST })

    try {
        const { accessToken } = getState().userLogin
        const { userId } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        await axios.delete(`http://localhost:5000/api/user/${userId}`, config)

        dispatch({
            type: actionTypes.DELETE_USER_SUCCESS
        })

        dispatch(logout())
    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_USER_FAILURE,
            payload: { error: error.response?.data?.message || 'Failed to delete user' }
        })
    }
}

export const fetchStrangerDetails = (strangerId) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_STRANGER_DETAILS_REQUEST })

    try {
        const { accessToken } = getState().userLogin

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.get(
            `http://localhost:5000/api/user/${strangerId}`,
            config
        )

        dispatch({
            type: actionTypes.FETCH_STRANGER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_STRANGER_DETAILS_FAILURE,
            payload: { error: error.response?.data?.message || 'An error occurred' }
        })
    }
}

export const fetchStrangerArticles = (strangerId) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_STRANGER_ARTICLES_REQUEST })

    try {
        const { accessToken } = getState().userLogin

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.get(
            `http://localhost:5000/api/user/${strangerId}/articles`,
            config
        )

        dispatch({
            type: actionTypes.FETCH_STRANGER_ARTICLES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_STRANGER_ARTICLES_FAILURE,
            payload: error.message || 'Failed to fetch user articles'
        })
    }
}
