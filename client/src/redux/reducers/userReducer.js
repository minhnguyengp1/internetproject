// userReducer.js
const initialState = {
    userDetails: null,
    error: null,
}

export const userDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_DETAILS_REQUEST':
            return {
                ...state,
                error: null,
            }
        case 'FETCH_USER_DETAILS_SUCCESS':
            return {
                ...state,
                userDetails: action.payload.userDetails,
                error: null,
            }
        case 'FETCH_USER_DETAILS_FAILURE':
            return {
                ...state,
                error: action.payload.error,
            }
        default:
            return state
    }
}

const initialArticlesState = {
    userArticles: [],
    loading: false,
    error: null,
}

export const userArticlesReducer = (state = initialArticlesState, action) => {
    switch (action.type) {
        case 'FETCH_USER_ARTICLES_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            }
        case 'FETCH_USER_ARTICLES_SUCCESS':
            return {
                ...state,
                userArticles: action.payload,
                loading: false,
                error: null,
            }
        case 'FETCH_USER_ARTICLES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
