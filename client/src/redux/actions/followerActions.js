import * as actionTypes from '../constants/followerActionTypes.js'
import axios from 'axios'

export const fetchFollowersList = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.FOLLOWERS_LIST_REQUEST })

    try {
        const { accessToken, userId } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.get(`http://localhost:5000/api/user/${userId}/followers`, config)

        console.log('data in fetchFollowersList: ', data)

        dispatch({ type: actionTypes.FOLLOWERS_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: actionTypes.FOLLOWERS_LIST_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const addFollower = (followerData) => async (dispatch) => {
    dispatch({ type: actionTypes.FOLLOWER_ADD_REQUEST })
    try {
        // Replace with actual API call
        const response = await fetch('/api/followers', {
            method: 'POST',
            body: JSON.stringify(followerData),
            headers: { 'Content-Type': 'application/json' }
        })
        await response.json()
        dispatch({ type: actionTypes.FOLLOWER_ADD_SUCCESS })
    } catch (error) {
        dispatch({ type: actionTypes.FOLLOWER_ADD_FAIL, payload: error.message })
    }
}

export const removeFollower = (followerId) => async (dispatch) => {
    dispatch({ type: actionTypes.FOLLOWER_REMOVE_REQUEST })
    try {
        // Replace with actual API call
        await fetch(`/api/followers/${followerId}`, { method: 'DELETE' })
        dispatch({ type: actionTypes.FOLLOWER_REMOVE_SUCCESS })
    } catch (error) {
        dispatch({ type: actionTypes.FOLLOWER_REMOVE_FAIL, payload: error.message })
    }
}