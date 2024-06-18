import * as actionTypes from '../constants/conversationActionTypes.js'

const initialState = {
    loading: false,
    conversations: [],
    error: null
}

export const conversationListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CONVERSATIONS_REQUEST:
            return { ...state, loading: true }
        case actionTypes.FETCH_CONVERSATIONS_SUCCESS:
            return { ...state, loading: false, conversations: action.payload }
        case actionTypes.FETCH_CONVERSATIONS_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}