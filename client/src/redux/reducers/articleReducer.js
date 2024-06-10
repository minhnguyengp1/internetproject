import * as actionTypes from '../constants/articleActionTypes.js'

export const articleDetailsReducer = (state = {
    article: {
        reviews: [],
        images: [],
        category: [],
        sizes: []
    }
}, action) => {
    switch (action.type) {
        case actionTypes.ARTICLE_DETAILS_REQUEST:
            return { loading: true, ...state }
        case actionTypes.ARTICLE_DETAILS_SUCCESS:
            return { loading: false, article: action.payload }
        case actionTypes.ARTICLE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const articleDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ARTICLE_DELETE_REQUEST:
            return { loading: true }
        case actionTypes.ARTICLE_DELETE_SUCCESS:
            return { loading: false, success: true }
        case actionTypes.ARTICLE_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const articleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ARTICLE_CREATE_REQUEST:
            return { loading: true }
        case actionTypes.ARTICLE_CREATE_SUCCESS:
            return { loading: false, success: true, article: action.payload }
        case actionTypes.ARTICLE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.ARTICLE_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const articleUpdateReducer = (state = { article: {} }, action) => {
    switch (action.type) {
        case actionTypes.ARTICLE_UPDATE_REQUEST:
            return { loading: true }
        case actionTypes.ARTICLE_UPDATE_SUCCESS:
            return { loading: false, success: true, article: action.payload }
        case actionTypes.ARTICLE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.ARTICLE_UPDATE_RESET:
            return { article: {} }
        default:
            return state
    }
}
