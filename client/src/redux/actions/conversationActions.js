import * as actionTypes from '../constants/conversationActionTypes.js'
import axios from 'axios'

export const fetchConversations = (userId) => async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_CONVERSATIONS_REQUEST })

    try {
        const { data } = await axios.get(`http://localhost:5000/api/conversations/${userId}`)

        dispatch({
            type: actionTypes.FETCH_CONVERSATIONS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.FETCH_CONVERSATIONS_FAIL,
            payload: error.response?.data?.message || error.message
        })
    }
}
