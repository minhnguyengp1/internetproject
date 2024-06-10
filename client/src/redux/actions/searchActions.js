import axios from 'axios'
import * as actionTypes from '../constants/searchActionTypes.js'

export const searchArticles = (query) => async (dispatch) => {
    dispatch({ type: actionTypes.SEARCH_REQUEST })

    try {
        const { data } = await axios.get(`http://localhost:5000/api/articles?search=${query}`)

        console.log('data in search thunk: ', data)
        dispatch({
            type: actionTypes.SEARCH_SUCCESS,
            payload: data.results
        })
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH_FAILURE,
            payload: error.message || 'Failed to fetch search results'
        })
    }
}
