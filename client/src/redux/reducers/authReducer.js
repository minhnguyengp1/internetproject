import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants/authActionTypes.js'

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
    error: null,
}

// Reducer function for authentication
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user, // Store the user information
                token: action.payload.token, // Store the authentication token
                isLoading: false,
            }
        case LOGIN_FAILURE:
            // When the login fails, set an error message
            return {
                ...state,
                isAuthenticated: false,
                error: action.error, // Store the error message
                isLoading: false,
            }

        default:
            return state
    }
}

export default authReducer
