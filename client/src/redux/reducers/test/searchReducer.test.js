import { searchReducer } from '../searchReducer'
import * as actionTypes from '../../constants/searchActionTypes'

describe('searchReducer', () => {
    const initialState = {}

    it('should return the initial state', () => {
        expect(searchReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle SEARCH_REQUEST', () => {
        expect(
            searchReducer(initialState, {
                type: actionTypes.SEARCH_REQUEST,
            })
        ).toEqual({
            loading: true,
            results: [],
            error: null,
        })
    })

    it('should handle SEARCH_SUCCESS', () => {
        const payload = [
            { id: 1, title: 'Article 1' },
            { id: 2, title: 'Article 2' },
        ]
        expect(
            searchReducer(initialState, {
                type: actionTypes.SEARCH_SUCCESS,
                payload,
            })
        ).toEqual({
            loading: false,
            results: payload,
            error: null,
        })
    })

    it('should handle SEARCH_FAILURE', () => {
        const payload = 'Failed to fetch search results'
        expect(
            searchReducer(initialState, {
                type: actionTypes.SEARCH_FAILURE,
                payload,
            })
        ).toEqual({
            loading: false,
            results: [],
            error: payload,
        })
    })
})
