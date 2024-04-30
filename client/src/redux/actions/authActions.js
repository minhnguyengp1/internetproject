import {
    REQUEST_LOADING,
    REQUEST_SUCCESS,
    REQUEST_FAILED,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
} from '../constants/authActionTypes.js'
import axios from 'axios'

const requestLoading = () => ({
    type: REQUEST_LOADING,
})

const requestSuccess = (payload) => ({
    type: REQUEST_SUCCESS,
    payload,
})

const requestFailed = () => ({
    type: REQUEST_FAILED,
})

const registerSuccess = () => ({
    type: REGISTER_SUCCESS,
})

const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
})

export const loginThunk = (credentials) => {
    return async (dispatch) => {
        dispatch(requestLoading())

        try {
            // const response = await someApi.login(credentials) // Assume an API call
            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                credentials
            )
            console.log('response.data: ' + JSON.stringify(response.data))
            const { access_token, email } = response.data

            localStorage.setItem('token', access_token)

            console.log('access_token: ' + access_token)
            console.log('email: ' + email)

            dispatch(requestSuccess({ access_token, email }))
        } catch (error) {
            console.log('error by login: ' + error.message)
            dispatch(requestFailed())
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
            console.log('error by registration: ' + error.message)
            dispatch(requestFailed())
        }
    }
}

export const logoutThunk = () => (dispatch) => {
    localStorage.removeItem('token')
    console.log('Logged out and removed token from LocalStorage')

    dispatch(logoutSuccess())
}
