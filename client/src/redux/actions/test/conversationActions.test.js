import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import axios from 'axios'
import * as actionTypes from '../../constants/conversationActionTypes'
import * as actions from '../conversationActions'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Conversation Actions', () => {
    let store

    beforeEach(() => {
        store = mockStore({})
        jest.clearAllMocks()
    })

    test('fetchConversations creates FETCH_CONVERSATIONS_SUCCESS when fetching conversations has been done', async () => {
        const mockData = [{ id: 1, message: 'Test Message' }]
        axios.get.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.FETCH_CONVERSATIONS_REQUEST },
            {
                type: actionTypes.FETCH_CONVERSATIONS_SUCCESS,
                payload: mockData,
            },
        ]

        await store.dispatch(actions.fetchConversations(1))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchConversations creates FETCH_CONVERSATIONS_FAIL when fetching conversations fails', async () => {
        const mockError = 'Failed to fetch conversations'
        axios.get.mockRejectedValue(new Error(mockError))

        const expectedActions = [
            { type: actionTypes.FETCH_CONVERSATIONS_REQUEST },
            { type: actionTypes.FETCH_CONVERSATIONS_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.fetchConversations(1))
        expect(store.getActions()).toEqual(expectedActions)
    })
})
