import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import axios from 'axios'
import * as actionTypes from '../../constants/messageActionTypes'
import * as actions from '../messageActions'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Message Actions', () => {
    let store

    beforeEach(() => {
        store = mockStore({})
        jest.clearAllMocks()
    })

    test('fetchMessages creates FETCH_MESSAGES_SUCCESS when fetching messages has been done', async () => {
        const mockData = [{ id: 1, text: 'Test Message' }]
        axios.get.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.FETCH_MESSAGES_REQUEST },
            { type: actionTypes.FETCH_MESSAGES_SUCCESS, payload: mockData },
        ]

        await store.dispatch(actions.fetchMessages(1))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchMessages creates FETCH_MESSAGES_FAIL when fetching messages fails', async () => {
        const mockError = 'Failed to fetch messages'
        axios.get.mockRejectedValue({
            response: { data: { message: mockError } },
        })

        const expectedActions = [
            { type: actionTypes.FETCH_MESSAGES_REQUEST },
            { type: actionTypes.FETCH_MESSAGES_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.fetchMessages(1))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('sendMessage creates SEND_MESSAGE_SUCCESS when sending message has been done', async () => {
        const mockData = { id: 1, text: 'Test Message' }
        axios.post.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.SEND_MESSAGE_SUCCESS, payload: mockData },
        ]

        await store.dispatch(actions.sendMessage({ text: 'Test Message' }))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('sendMessage handles error when sending message fails', async () => {
        const mockError = 'Failed to send message'
        axios.post.mockRejectedValue(new Error(mockError))

        await store.dispatch(actions.sendMessage({ text: 'Test Message' }))

        expect(store.getActions()).toEqual([])
    })
})
