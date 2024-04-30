import * as actionTypes from '../constants/userActionTypes.js'
import axios from 'axios'

const loginRequest = () => ({
    type: actionTypes.USER_LOGIN_REQUEST,
})

const loginSuccess = (data) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: data,
})

const loginFail = (errorMessage) => ({
    type: actionTypes.USER_LOGIN_FAIL,
    payload: errorMessage,
})

const registerRequest = (data) => ({
    type: actionTypes.USER_REGISTER_REQUEST,
    payload: data,
})

const registerSuccess = () => ({
    type: actionTypes.USER_REGISTER_SUCCESS,
})

const registerFail = (errorMessage) => ({
    type: actionTypes.USER_REGISTER_FAIL,
    payload: errorMessage,
})

export const loginThunk = (credentials) => {
    return async (dispatch) => {
        try {
            dispatch(loginRequest())

            // const response = await someApi.login(credentials) // Assume an API call
            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                credentials
            )
            console.log('response.data: ' + JSON.stringify(response.data))
            const { access_token, email } = response.data

            console.log('access_token: ' + access_token)
            console.log('email: ' + email)

            dispatch(loginSuccess({ access_token, email }))
        } catch (error) {
            // Determine the error message for failed login
            const errorMessage =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            // Dispatch the failed login action with the appropriate error message
            dispatch(loginFail(errorMessage))
        }
    }
}

export const registerThunk = (registerData) => {
    return async (dispatch) => {
        try {
            dispatch(registerRequest())

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
            // Determine the error message for failed registration
            const errorMessage =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

            // Dispatch the failed login action with the appropriate error message
            dispatch(registerFail(errorMessage))
        }
    }
}
