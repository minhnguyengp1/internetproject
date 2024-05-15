import * as actionTypes from '../constants/userActionTypes.js'
import axios from 'axios'

export const fetchUserDetails = () => async (dispatch, getState) => {
    dispatch({ type: 'FETCH_USER_DETAILS_REQUEST' })

    try {
        const { accessToken } = getState().auth
        const { userId } = getState().auth // Assuming you have a userId field in your auth state

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }

        const { data } = await axios.get(
            `http://localhost:5000/api/user/${userId}`,
            config
        )

        dispatch({
            type: 'FETCH_USER_DETAILS_SUCCESS',
            payload: { userDetails: data },
        })
    } catch (error) {
        dispatch({
            type: 'FETCH_USER_DETAILS_FAILURE',
            payload: { error: 'An error occurred' },
        })
    }
}
