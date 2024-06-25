import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import axios from 'axios'
import * as actionTypes from '../../constants/searchActionTypes'
import * as actions from '../searchActions'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Search Actions', () => {
    let store

    beforeEach(() => {
        store = mockStore({})
        jest.clearAllMocks()
    })

    test('searchArticles creates SEARCH_SUCCESS when fetching search results has been done', async () => {
        const mockData = [{ id: 1, title: 'Test Article' }]
        axios.get.mockResolvedValue({ data: mockData })

        const category = 'electronics'
        const searchQuery = 'laptop'
        const filter = { minPrice: 100, maxPrice: 1000, city: 'New York' }

        const expectedActions = [
            { type: actionTypes.SEARCH_REQUEST },
            { type: actionTypes.SEARCH_SUCCESS, payload: mockData },
        ]

        await store.dispatch(
            actions.searchArticles(category, searchQuery, filter)
        )
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('searchArticles creates SEARCH_FAILURE when fetching search results fails', async () => {
        const mockError = 'Failed to fetch search results'
        axios.get.mockRejectedValue(new Error(mockError))

        const category = 'electronics'
        const searchQuery = 'laptop'
        const filter = { minPrice: 100, maxPrice: 1000, city: 'New York' }

        const expectedActions = [
            { type: actionTypes.SEARCH_REQUEST },
            { type: actionTypes.SEARCH_FAILURE, payload: mockError },
        ]

        await store.dispatch(
            actions.searchArticles(category, searchQuery, filter)
        )
        expect(store.getActions()).toEqual(expectedActions)
    })
})
