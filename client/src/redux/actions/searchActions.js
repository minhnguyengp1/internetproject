import axios from 'axios'
import * as actionTypes from '../constants/searchActionTypes.js'

export const searchArticles = (category, searchQuery, filter) => async (dispatch) => {
    dispatch({ type: actionTypes.SEARCH_REQUEST })

    try {
        const params = new URLSearchParams()
        if (category) {
            params.append('category', category)
        }
        if (searchQuery) {
            params.append('search', searchQuery)
        }
        if (filter.minPrice) {
            params.append('minPrice', filter.minPrice)
        }
        if (filter.maxPrice) {
            params.append('maxPrice', filter.maxPrice)
        }
        if (filter.city) {
            params.append('city', filter.city)
        }

        const { data } = await axios.get(`http://localhost:5000/api/articles/search?${params.toString()}`)

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

