import * as actionTypes from '../constants/userActionTypes.js'
import axios from 'axios'

export const loginThunk = ({ email, password }) => {
    return async (dispatch) => {
        dispatch({ type: 'LOGIN_REQUEST' })

        try {
            // const response = await someApi.login(credentials) // Assume an API call
            const { data } = await axios.post(
                'http://localhost:5000/api/auth/login',
                { email, password }
            )

            console.log('data in loginThunk: ' + JSON.stringify(data))

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { userId: data.userId, accessToken: data.accessToken },
            })
        } catch (error) {
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: { error: 'An error occurred' },
            })
        }
    }
}

export const registerThunk = ({ fullName, email, password }) => {
    return async (dispatch) => {
        dispatch({ type: 'REGISTER_REQUEST' })

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/register',
                { fullName, email, password }
            )

            dispatch({ type: 'REGISTER_SUCCESS' })
        } catch (error) {
            dispatch({
                type: 'REGISTER_FAILURE',
                payload: { error: 'An error occurred' },
            })
        }
    }
}

// export const logoutThunk = () => (dispatch) => {
//     localStorage.removeItem('token')
//     console.log('Logged out and removed token from LocalStorage')

//     dispatch(logoutSuccess())
// }
