import { conversationListReducer } from '../conversationReducer'
import * as actionTypes from '../../constants/conversationActionTypes'

describe('conversationListReducer', () => {
    const initialState = {
        loading: false,
        conversations: [],
        error: null,
    }

    it('should return the initial state', () => {
        expect(conversationListReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle FETCH_CONVERSATIONS_REQUEST', () => {
        const action = { type: actionTypes.FETCH_CONVERSATIONS_REQUEST }
        const expectedState = { ...initialState, loading: true }

        expect(conversationListReducer(initialState, action)).toEqual(
            expectedState
        )
    })

    it('should handle FETCH_CONVERSATIONS_SUCCESS', () => {
        const payload = [{ id: 1, message: 'Test conversation' }]
        const action = {
            type: actionTypes.FETCH_CONVERSATIONS_SUCCESS,
            payload,
        }
        const expectedState = {
            ...initialState,
            loading: false,
            conversations: payload,
        }

        expect(conversationListReducer(initialState, action)).toEqual(
            expectedState
        )
    })

    it('should handle FETCH_CONVERSATIONS_FAIL', () => {
        const payload = 'Error message'
        const action = { type: actionTypes.FETCH_CONVERSATIONS_FAIL, payload }
        const expectedState = {
            ...initialState,
            loading: false,
            error: payload,
        }

        expect(conversationListReducer(initialState, action)).toEqual(
            expectedState
        )
    })
})
