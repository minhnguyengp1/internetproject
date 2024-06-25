import { messageListReducer } from '../messageReducer'
import * as actionTypes from '../../constants/messageActionTypes'

const initialState = {
    loading: false,
    messages: [],
    error: null,
}

describe('messageListReducer', () => {
    it('should return the initial state', () => {
        expect(messageListReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle FETCH_MESSAGES_REQUEST', () => {
        expect(
            messageListReducer(initialState, {
                type: actionTypes.FETCH_MESSAGES_REQUEST,
            })
        ).toEqual({
            ...initialState,
            loading: true,
        })
    })

    it('should handle FETCH_MESSAGES_SUCCESS', () => {
        const payload = [{ id: 1, text: 'Test message' }]
        expect(
            messageListReducer(initialState, {
                type: actionTypes.FETCH_MESSAGES_SUCCESS,
                payload,
            })
        ).toEqual({
            ...initialState,
            loading: false,
            messages: payload,
        })
    })

    it('should handle FETCH_MESSAGES_FAIL', () => {
        const payload = 'Failed to fetch messages'
        expect(
            messageListReducer(initialState, {
                type: actionTypes.FETCH_MESSAGES_FAIL,
                payload,
            })
        ).toEqual({
            ...initialState,
            loading: false,
            error: payload,
        })
    })

    it('should handle SEND_MESSAGE_SUCCESS', () => {
        const initialStateWithMessages = {
            ...initialState,
            messages: [{ id: 1, text: 'Existing message' }],
        }
        const payload = { id: 2, text: 'New message' }
        expect(
            messageListReducer(initialStateWithMessages, {
                type: actionTypes.SEND_MESSAGE_SUCCESS,
                payload,
            })
        ).toEqual({
            ...initialStateWithMessages,
            messages: [...initialStateWithMessages.messages, payload],
        })
    })
})
