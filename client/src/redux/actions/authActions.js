import * as actionTypes from '../constants/authActionTypes.js'
import axios from 'axios'

export const login = ({ email, password }) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.LOGIN_REQUEST })

        try {
            const { data } = await axios.post(
                'http://localhost:5000/api/auth/login',
                { email, password }
            )

            const { accessToken, userId } = data

            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: { userId: userId, accessToken: accessToken }
            })
        } catch (error) {
            let errorMessage = 'Unknown error occurred'

            if (error.response && error.response.data) {
                errorMessage = error.response.data
            } else if (error.message) {
                errorMessage = error.message
            }

            dispatch({
                type: actionTypes.LOGIN_FAILURE,
                payload: errorMessage
            })
        }
    }
}

export const register = ({ fullName, email, password }) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.REGISTER_REQUEST })

        try {
            await axios.post('http://localhost:5000/api/auth/register', {
                fullName,
                email,
                password
            })

            dispatch({ type: actionTypes.REGISTER_SUCCESS })
        } catch (error) {
            let errorMessage = 'Unknown error occurred'

            if (error.response && error.response.data) {
                errorMessage = error.response.data
            } else if (error.message) {
                errorMessage = error.message
            }

            dispatch({
                type: actionTypes.REGISTER_FAILURE,
                payload: errorMessage
            })
        }
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOGOUT })
    }
}

