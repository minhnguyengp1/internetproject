import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants/authActionTypes.js'
import axios from 'axios'

const loginRequest = () => ({
    type: LOGIN_REQUEST,
})

const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload, // The payload object contains the data passed to the action
})

const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    error, // If there's an error, you might include it in the action
})

export const loginThunk = (credentials) => {
    return async (dispatch) => {
        dispatch(loginRequest()) // Dispatch the request action

        try {
            // const response = await someApi.login(credentials) // Assume an API call
            const response = await axios.post(
                'http://localhost:8800/api/auth/login',
                credentials
            )
            const { token, user } = response.data

            dispatch(loginSuccess({ token, user })) // Dispatch success with user data
        } catch (error) {
            dispatch(loginFailure(error.message)) // Dispatch failure with error message
        }
    }
}
