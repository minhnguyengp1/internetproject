import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import axios from 'axios'
import * as actionTypes from '../../constants/reviewActionTypes'
import * as actions from '../reviewActions'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
    userLogin: {
        accessToken: 'fakeAccessToken',
        userId: 1,
    },
}

describe('Review Actions', () => {
    let store

    beforeEach(() => {
        store = mockStore(initialState)
        jest.clearAllMocks()
    })

    test('submitReview creates SUBMIT_REVIEW_SUCCESS when submitting review has been done', async () => {
        const mockData = { id: 1, text: 'Test Review' }
        axios.post.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.SUBMIT_REVIEW_REQUEST },
            { type: actionTypes.SUBMIT_REVIEW_SUCCESS, payload: mockData },
        ]

        await store.dispatch(actions.submitReview(1, { review: 'Test Review' }))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('submitReview creates SUBMIT_REVIEW_FAILURE when submitting review fails', async () => {
        const mockError = 'Failed to submit review'
        axios.post.mockRejectedValue({
            response: { data: { message: mockError } },
        })

        const expectedActions = [
            { type: actionTypes.SUBMIT_REVIEW_REQUEST },
            { type: actionTypes.SUBMIT_REVIEW_FAILURE, payload: mockError },
        ]

        await store.dispatch(actions.submitReview(1, { review: 'Test Review' }))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchUserReviews creates FETCH_USER_REVIEWS_SUCCESS when fetching user reviews has been done', async () => {
        const mockData = [{ id: 1, text: 'Test Review' }]
        axios.get.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.FETCH_USER_REVIEWS_REQUEST },
            { type: actionTypes.FETCH_USER_REVIEWS_SUCCESS, payload: mockData },
        ]

        await store.dispatch(actions.fetchUserReviews())
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchUserReviews creates FETCH_USER_REVIEWS_FAILURE when fetching user reviews fails', async () => {
        const mockError = 'Failed to fetch reviews'
        axios.get.mockRejectedValue({
            response: { data: { message: mockError } },
        })

        const expectedActions = [
            { type: actionTypes.FETCH_USER_REVIEWS_REQUEST },
            {
                type: actionTypes.FETCH_USER_REVIEWS_FAILURE,
                payload: mockError,
            },
        ]

        await store.dispatch(actions.fetchUserReviews())
        expect(store.getActions()).toEqual(expectedActions)
    })
})
