import * as actionTypes from '../constants/authActionTypes.js'

const initialState = {
    accessToken: localStorage.getItem('accessToken') || null,
    userId: localStorage.getItem('userId') || null,
    isAuthenticated: localStorage.getItem('accessToken') ? true : false,
    error: null
}

export const userLogin = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                error: null
            }
        case actionTypes.LOGIN_SUCCESS:
            localStorage.setItem('accessToken', action.payload.accessToken)
            localStorage.setItem('userId', action.payload.userId)
            return {
                ...state,
                accessToken: action.payload.accessToken,
                userId: action.payload.userId,
                isAuthenticated: true,
                error: null
            }
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        case actionTypes.LOGOUT:
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userId')
            return {
                ...state,
                accessToken: null,
                userId: null,
                isAuthenticated: false,
                error: null
            }
        default:
            return state
    }
}

export const userRegister = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_REQUEST:
            return {
                loading: true
            }
        case actionTypes.REGISTER_SUCCESS:
            return {
                message: action.payload,
                success: true
            }
        case actionTypes.REGISTER_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}