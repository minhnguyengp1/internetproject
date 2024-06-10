import * as actionTypes from '../constants/userActionTypes.js'

const initialState = {
    userDetails: null,
    error: null
}

export const userDetails = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_DETAILS_REQUEST:
            return {
                ...state,
                error: null
            }
        case actionTypes.FETCH_USER_DETAILS_SUCCESS:
            return {
                ...state,
                userDetails: action.payload.userDetails,
                error: null
            }
        case actionTypes.FETCH_USER_DETAILS_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}

const initialArticlesState = {
    userArticles: [],
    loading: false,
    error: null
}

export const userArticles = (state = initialArticlesState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_ARTICLES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.FETCH_USER_ARTICLES_SUCCESS:
            return {
                ...state,
                userArticles: action.payload,
                loading: false,
                error: null
            }
        case actionTypes.FETCH_USER_ARTICLES_FAILURE:
            return {
                ...state,
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