import * as actionTypes from '../constants/reviewActionTypes.js'
import axios from 'axios'

export const submitReview = (subjectId, reviewData) => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.SUBMIT_REVIEW_REQUEST })

        try {
            const { accessToken, userId } = getState().userLogin

            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post(
                `http://localhost:5000/api/reviews`,
                {
                    authorId: userId,
                    subjectId,
                    text: reviewData.review
                },
                config
            )

            dispatch({
                type: actionTypes.SUBMIT_REVIEW_SUCCESS,
                payload: data
            })
        } catch (error) {
            const errorMessage =
                error.response && error.response.data
                    ? error.response.data.message
                    : error.message

            dispatch({
                type: actionTypes.SUBMIT_REVIEW_FAILURE,
                payload: errorMessage
            })
        }
    }
}

export const fetchUserReviews = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_USER_REVIEWS_REQUEST })

    try {
        const { accessToken, userId: subjectId } = getState().userLogin

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.get(
            `http://localhost:5000/api/reviews/subject/${subjectId}`,
            config
        )

        dispatch({
            type: actionTypes.FETCH_USER_REVIEWS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const errorMessage =
            error.response && error.response.data
                ? error.response.data.message
                : error.message

        dispatch({
            type: actionTypes.FETCH_USER_REVIEWS_FAILURE,
            payload: errorMessage
        })
    }
}