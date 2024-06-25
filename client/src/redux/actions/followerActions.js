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

export const fetchFollowingList = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.FOLLOWING_LIST_REQUEST })

    try {
        const { accessToken, userId } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.get(`http://localhost:5000/api/user/${userId}/following`, config)

        console.log('data in fetchFollowingList: ', data)

        dispatch({ type: actionTypes.FOLLOWING_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: actionTypes.FOLLOWING_LIST_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const removeFollower = (strangerId) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.FOLLOWER_REMOVE_REQUEST })

    try {
        const { accessToken, userId } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        const data = { userId } // Include userId in the request body

        await axios.delete(`http://localhost:5000/api/user/remove/${strangerId}`, { ...config, data })

        dispatch({ type: actionTypes.FOLLOWER_REMOVE_SUCCESS })

        dispatch(fetchFollowersList())
    } catch (error) {
        dispatch({
            type: actionTypes.FOLLOWER_REMOVE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const followUser = (strangerId) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.FOLLOW_USER_REQUEST })

    try {
        const { accessToken, userId } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        await axios.put(`http://localhost:5000/api/user/${userId}/follow/${strangerId}`, config)

        dispatch({ type: actionTypes.FOLLOW_USER_SUCCESS })

        dispatch(fetchFollowersList())
    } catch (error) {
        dispatch({
            type: actionTypes.FOLLOW_USER_FAIL,
            payload: error.response.data.message || error.message
        })
    }
}

export const unfollowUser = (strangerId) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.UNFOLLOW_USER_REQUEST })

    try {
        const { accessToken, userId } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        await axios.delete(`http://localhost:5000/api/user/${userId}/follow/${strangerId}`, config)

        dispatch({ type: actionTypes.UNFOLLOW_USER_SUCCESS })

        dispatch(fetchFollowersList())
    } catch (error) {
        dispatch({
            type: actionTypes.UNFOLLOW_USER_FAIL,
            payload: error.response.data.message || error.message
        })
    }
}