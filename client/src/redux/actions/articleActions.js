import * as actionTypes from '../constants/articleActionTypes.js'
import axios from 'axios'

// Fetch Article Details
export const fetchArticleDetails = (articleId) => async (dispatch, getState) => {
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
export const createArticle = (articleData) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.ARTICLE_CREATE_REQUEST })

    try {
        const { accessToken, userId } = getState().userLogin

        const articleDataWithUserId = {
            ...articleData,
            userId
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/articles', articleDataWithUserId, config)

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