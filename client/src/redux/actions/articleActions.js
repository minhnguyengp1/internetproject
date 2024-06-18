import * as actionTypes from '../constants/articleActionTypes.js'
import axios from 'axios'

// Fetch All Articles
export const fetchArticles = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.ARTICLES_LIST_REQUEST })

    try {
        const { accessToken } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.get('http://localhost:5000/api/articles', config)

        dispatch({
            type: actionTypes.ARTICLES_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.ARTICLES_LIST_FAIL,
            payload: error.message || 'Failed to fetch articles'
        })
    }
}

// Fetch Article By id
export const fetchArticleById = (articleId) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.ARTICLE_DETAILS_REQUEST })

    try {
        const { accessToken } = getState().userLogin

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.get(`http://localhost:5000/api/articles/${articleId}`, config)

        dispatch({
            type: actionTypes.ARTICLE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.ARTICLE_DETAILS_FAIL,
            payload: error.message || 'Failed to fetch article details'
        })
    }
}

// Create Article
export const createArticle = (formData) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.ARTICLE_CREATE_REQUEST })

    try {
        const { accessToken, userId } = getState().userLogin

        formData.append('userId', userId)

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/articles', formData, config)

        dispatch({
            type: actionTypes.ARTICLE_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.ARTICLE_CREATE_FAIL,
            payload: error.message || 'Failed to create article'
        })
    }
}

// Update Article
export const updateArticle = (articleId, updatedData) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.ARTICLE_UPDATE_REQUEST })

    try {
        const { accessToken, userId } = getState().userLogin

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.put(`http://localhost:5000/api/articles/${articleId}`, updatedData, config)

        dispatch({
            type: actionTypes.ARTICLE_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.ARTICLE_UPDATE_FAIL,
            payload: error.message || 'Failed to update article'
        })
    }
}

export const deleteArticle = (articleId) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.ARTICLE_DELETE_REQUEST })

    try {
        const { accessToken } = getState().userLogin

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }

        await axios.delete(`http://localhost:5000/api/articles/${articleId}`, config)

        dispatch({
            type: actionTypes.ARTICLE_DELETE_SUCCESS,
            payload: articleId
        })
    } catch (error) {
        dispatch({
            type: actionTypes.ARTICLE_DELETE_FAIL,
            payload: error.message || 'Failed to delete article'
        })
    }
}

export const setSelectedCategory = (category) => ({
    type: actionTypes.SET_SELECTED_CATEGORY,
    payload: category
})