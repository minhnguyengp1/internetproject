import * as actionTypes from '../constants/userActionTypes.js'
import defaultAvatar from '../../assets/default-avatar.png'

const initialState = {
    userDetails: {
        fullName: '',
        street: '',
        city: '',
        postalCode: '',
        img: defaultAvatar
    },
    error: null,
    loading: false
}

export const userDetails = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.FETCH_USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetails: action.payload,
                error: null
            }
        case actionTypes.FETCH_USER_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const userArticles = (state = { userArticles: [] }, action) => {
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
                error: action.payload,
                userArticles: []
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

export const strangerDetails = (state = {
    loading: false,
    strangerDetails: {
        fullName: '',
        street: '',
        city: '',
        postalCode: '',
        img: defaultAvatar
    },
    error: null
}, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STRANGER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.FETCH_STRANGER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                strangerDetails: action.payload,
                error: null
            }
        case actionTypes.FETCH_STRANGER_DETAILS_FAILURE:
            return {
                ...state,
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