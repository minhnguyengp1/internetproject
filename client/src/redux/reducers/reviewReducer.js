import * as actionTypes from '../constants/reviewActionTypes.js'

export const reviewSubmitReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SUBMIT_REVIEW_REQUEST:
            return {
                loading: true,
                success: false,
                error: null
            }
        case actionTypes.SUBMIT_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true,
                error: null
            }
        case actionTypes.SUBMIT_REVIEW_FAILURE:
            return {
                loading: false,
                success: false,
                error: action.payload
            }
        default:
            return state
    }
}


export const userReviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_REVIEWS_REQUEST:
            return {
                loading: true,
                error: null
            }
        case actionTypes.FETCH_USER_REVIEWS_SUCCESS:
            return {
                userReviews: action.payload,
                loading: false,
                error: null
            }
        case actionTypes.FETCH_USER_REVIEWS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}