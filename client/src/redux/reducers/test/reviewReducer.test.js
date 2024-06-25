import { reviewSubmitReducer, userReviewsReducer } from '../reviewReducer'
import * as actionTypes from '../../constants/reviewActionTypes'

describe('reviewSubmitReducer', () => {
    const initialState = {}

    it('should return the initial state', () => {
        expect(reviewSubmitReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle SUBMIT_REVIEW_REQUEST', () => {
        expect(
            reviewSubmitReducer(initialState, {
                type: actionTypes.SUBMIT_REVIEW_REQUEST,
            })
        ).toEqual({
            loading: true,
            success: false,
            error: null,
        })
    })

    it('should handle SUBMIT_REVIEW_SUCCESS', () => {
        expect(
            reviewSubmitReducer(initialState, {
                type: actionTypes.SUBMIT_REVIEW_SUCCESS,
            })
        ).toEqual({
            loading: false,
            success: true,
            error: null,
        })
    })

    it('should handle SUBMIT_REVIEW_FAILURE', () => {
        const payload = 'Failed to submit review'
        expect(
            reviewSubmitReducer(initialState, {
                type: actionTypes.SUBMIT_REVIEW_FAILURE,
                payload,
            })
        ).toEqual({
            loading: false,
            success: false,
            error: payload,
        })
    })
})

describe('userReviewsReducer', () => {
    const initialState = {}

    it('should return the initial state', () => {
        expect(userReviewsReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle FETCH_USER_REVIEWS_REQUEST', () => {
        expect(
            userReviewsReducer(initialState, {
                type: actionTypes.FETCH_USER_REVIEWS_REQUEST,
            })
        ).toEqual({
            loading: true,
            error: null,
        })
    })

    it('should handle FETCH_USER_REVIEWS_SUCCESS', () => {
        const payload = [{ id: 1, text: 'Great product!' }]
        expect(
            userReviewsReducer(initialState, {
                type: actionTypes.FETCH_USER_REVIEWS_SUCCESS,
                payload,
            })
        ).toEqual({
            userReviews: payload,
            loading: false,
            error: null,
        })
    })

    it('should handle FETCH_USER_REVIEWS_FAILURE', () => {
        const payload = 'Failed to fetch user reviews'
        expect(
            userReviewsReducer(initialState, {
                type: actionTypes.FETCH_USER_REVIEWS_FAILURE,
                payload,
            })
        ).toEqual({
            loading: false,
            error: payload,
        })
    })
})
