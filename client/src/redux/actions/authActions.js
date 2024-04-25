import {
    REQUEST_LOADING,
    REQUEST_SUCCESS,
    REQUEST_FAILED,
    REGISTER_SUCCESS,
} from '../constants/authActionTypes.js'
import axios from 'axios'

const requestLoading = () => ({
    type: REQUEST_LOADING,
})

const requestSuccess = (payload) => ({
    type: REQUEST_SUCCESS,
    payload, // The payload object contains the data passed to the action
})

const requestFailed = (error) => ({
    type: REQUEST_FAILED,
    error, // If there's an error, you might include it in the action
})

const registerSuccess = () => ({
    type: REGISTER_SUCCESS,
})

export const loginThunk = (credentials) => {
    return async (dispatch) => {
        dispatch(requestLoading()) // Dispatch the request action

        try {
            // const response = await someApi.login(credentials) // Assume an API call
            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                credentials
            )
            console.log('response.data: ' + JSON.stringify(response.data))
            const { access_token, email } = response.data

            console.log('access_token: ' + access_token)
            console.log('email: ' + email)

            dispatch(requestSuccess({ access_token, email })) // Dispatch success with user data
        } catch (error) {
            dispatch(requestFailed(error.message)) // Dispatch failure with error message
        }
    }
}

export const registerThunk = (registerData) => {
    return async (dispatch) => {
        dispatch(requestLoading()) // Dispatch the request action

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/register',
                registerData
            )

            console.log(
                'response.data: from registerThunk ' +
                    JSON.stringify(response.data)
            )

            dispatch(registerSuccess())
        } catch (error) {
            dispatch(requestFailed(error.message))
        }
    }
}
