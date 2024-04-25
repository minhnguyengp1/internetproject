import {
    REQUEST_LOADING,
    REQUEST_SUCCESS,
    REQUEST_FAILED,
    REGISTER_SUCCESS,
} from '../constants/authActionTypes.js'

const initialState = {
    isAuthenticated: false,
    user: null, // The user's email
    token: null,
    isLoading: false,
    error: null,
}

// Reducer function for authentication
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_LOADING:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case REQUEST_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.email, // The user's email
                token: action.payload.access_token,
                isLoading: false,
            }
        case REQUEST_FAILED:
            return {
                ...state,
                isAuthenticated: false,
                error: action.error,
                isLoading: false,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            }

        default:
            return state
    }
}

export default authReducer
