import * as actionTypes from '../constants/searchActionTypes.js'

export const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_REQUEST:
            return { loading: true, results: [], error: null }
        case actionTypes.SEARCH_SUCCESS:
            return { loading: false, results: action.payload, error: null }
        case actionTypes.SEARCH_FAILURE:
            return { loading: false, results: [], error: action.payload }
        default:
            return state
    }
}
