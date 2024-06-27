import * as actionTypes from '../constants/messageActionTypes.js'
import axios from 'axios'

export const fetchMessages = (conversationId) => async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_MESSAGES_REQUEST })

    try {
        const { data } = await axios.get(`http://localhost:5000/api/messages/${conversationId}`)

        dispatch({
            type: actionTypes.FETCH_MESSAGES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_MESSAGES_FAIL,
            payload: error.response?.data?.message || error.message
        })
    }
}

export const sendMessage = (message) => async (dispatch) => {
    const { data } = await axios.post('http://localhost:5000/api/messages', message)

    dispatch({
        type: actionTypes.SEND_MESSAGE_SUCCESS,
        payload: data
    })
}