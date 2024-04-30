import { act } from 'react'
import {
    REQUEST_LOADING,
    REQUEST_SUCCESS,
    REQUEST_FAILED,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
    AUTH_RESTORE,
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
        case LOGOUT_SUCCESS:
            return {
                ...initialState,
            }
        case AUTH_RESTORE:
            console.log('state:' + state)
            console.log(action.payload.isAuthenticated)
            console.log(action.payload.token)
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                token: action.payload.token,
            }
        default:
            return state
    }
}
