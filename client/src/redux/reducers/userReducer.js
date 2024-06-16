import * as actionTypes from '../constants/userActionTypes.js'

export const userDetails = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_DETAILS_REQUEST:
            return {
                loading: true,
                error: null
            }
        case actionTypes.FETCH_USER_DETAILS_SUCCESS:
            return {
                loading: false,
                userDetails: action.payload,
                error: null
            }
        case actionTypes.FETCH_USER_DETAILS_FAILURE:
            return {
                loading: false,
                error: action.payload.error
            }
        default:
            return state
    }
}

export const userArticles = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_ARTICLES_REQUEST:
            return {
                loading: true,
                error: null
            }
        case actionTypes.FETCH_USER_ARTICLES_SUCCESS:
            return {
                userArticles: action.payload,
                loading: false,
                error: null
            }
        case actionTypes.FETCH_USER_ARTICLES_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const userUpdate = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            }
        case actionTypes.UPDATE_USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true
            }
        case actionTypes.UPDATE_USER_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                success: false
            }
        default:
            return state
    }
}

export const strangerDetails = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STRANGER_DETAILS_REQUEST:
            return {
                loading: true,
                error: null
            }
        case actionTypes.FETCH_STRANGER_DETAILS_SUCCESS:
            return {
                loading: false,
                strangerDetails: action.payload,
                error: null
            }
        case actionTypes.FETCH_STRANGER_DETAILS_FAILURE:
            return {
                loading: false,
                error: action.payload.error
            }
        default:
            return state
    }
}

export const strangerArticles = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STRANGER_ARTICLES_REQUEST:
            return {
                loading: true,
                error: null
            }
        case actionTypes.FETCH_STRANGER_ARTICLES_SUCCESS:
            return {
                strangerArticles: action.payload,
                loading: false,
                error: null
            }
        case actionTypes.FETCH_STRANGER_ARTICLES_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}