import * as actionTypes from '../constants/messageActionTypes.js'

const initialState = {
    loading: false,
    messages: [],
    error: null
}

export const messageListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MESSAGES_REQUEST:
            return { ...state, loading: true }
        case actionTypes.FETCH_MESSAGES_SUCCESS:
            return { ...state, loading: false, messages: action.payload }
        case actionTypes.FETCH_MESSAGES_FAIL:
            return { ...state, loading: false, error: action.payload }
        case actionTypes.SEND_MESSAGE_SUCCESS:
            return { ...state, messages: [...state.messages, action.payload] }
        default:
            return state
    }
}