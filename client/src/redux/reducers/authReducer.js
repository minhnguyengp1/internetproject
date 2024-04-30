import {
    REQUEST_LOADING,
    REQUEST_SUCCESS,
    REQUEST_FAILED,
    REGISTER_SUCCESS,
} from '../constants/authActionTypes.js'

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    isSuccessful: false,
    currentUser: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_LOADING:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: true,
            }
        case REQUEST_SUCCESS:
            return {
                isAuthenticated: true,
                isLoading: false,
                isSuccessful: true,
                currentUser: action.payload,
            }
        case REQUEST_FAILED:
            return initialState
        case REGISTER_SUCCESS:
            return {
                isAuthenticated: false,
                isLoading: false,
                isSuccessful: true,
                currentUser: null,
            }
        default:
            return state
    }
}
