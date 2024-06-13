// import axios from 'axios'
// import * as actionTypes from '../constants/searchActionTypes.js'
//
// export const searchArticles = (query) => async (dispatch) => {
//     dispatch({ type: actionTypes.SEARCH_REQUEST })
//
//     try {
//         const { data } = await axios.get(`http://localhost:5000/api/articles?search=${query}`)
//
//         console.log('data in search thunk: ', data)
//         dispatch({
//             type: actionTypes.SEARCH_SUCCESS,
//             payload: data
//         })
//     } catch (error) {
//         dispatch({
//             type: actionTypes.SEARCH_FAILURE,
//             payload: error.message || 'Failed to fetch search results'
//         })
//     }
// }

import axios from 'axios'
import * as actionTypes from '../constants/searchActionTypes.js'

export const searchArticles = (query, filter) => async (dispatch) => {
    dispatch({ type: actionTypes.SEARCH_REQUEST })

    try {
        // Construct the API request URL with query and filter parameters
        const params = new URLSearchParams()
        params.append('search', query)
        if (filter.minPrice) {
            params.append('minPrice', filter.minPrice)
        }
        if (filter.maxPrice) {
            params.append('maxPrice', filter.maxPrice)
        }

        console.log(`http://localhost:5000/api/articles?${params}`)

        const { data } = await axios.get(`http://localhost:5000/api/articles?${params}`)

        console.log('data in search thunk: ', data)
        dispatch({
            type: actionTypes.SEARCH_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH_FAILURE,
            payload: error.message || 'Failed to fetch search results'
        })
    }
}

