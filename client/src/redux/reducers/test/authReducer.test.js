import { userLogin, userRegister } from '../authReducer'
import * as actionTypes from '../../constants/authActionTypes'

describe('userLogin reducer', () => {
    const initialState = {
        accessToken: null,
        userId: null,
        isAuthenticated: false,
        error: null,
        loading: false,
    }

    it('should return the initial state', () => {
        expect(userLogin(undefined, {})).toEqual(initialState)
    })

    it('should handle LOGIN_REQUEST', () => {
        const action = { type: actionTypes.LOGIN_REQUEST }
        const expectedState = { ...initialState, loading: true, error: null }

        expect(userLogin(initialState, action)).toEqual(expectedState)
    })

    it('should handle LOGIN_SUCCESS', () => {
        const action = {
            type: actionTypes.LOGIN_SUCCESS,
            payload: { accessToken: 'token', userId: 'user1' },
        }
        const expectedState = {
            ...initialState,
            accessToken: 'token',
            userId: 'user1',
            isAuthenticated: true,
            loading: false,
            error: null,
        }

        expect(userLogin(initialState, action)).toEqual(expectedState)
    })

    it('should handle LOGIN_FAILURE', () => {
        const action = {
            type: actionTypes.LOGIN_FAILURE,
            payload: 'Error message',
        }
        const expectedState = {
            ...initialState,
            loading: false,
            error: 'Error message',
        }

        expect(userLogin(initialState, action)).toEqual(expectedState)
    })

    it('should handle LOGOUT', () => {
        const action = { type: actionTypes.LOGOUT }
        const expectedState = {
            ...initialState,
            accessToken: null,
            userId: null,
            isAuthenticated: false,
            error: null,
        }

        expect(userLogin(initialState, action)).toEqual(expectedState)
    })
})

describe('userRegister reducer', () => {
    const initialState = {}

    it('should return the initial state', () => {
        expect(userRegister(undefined, {})).toEqual(initialState)
    })

    it('should handle REGISTER_REQUEST', () => {
        const action = { type: actionTypes.REGISTER_REQUEST }
        const expectedState = { loading: true }

        expect(userRegister(initialState, action)).toEqual(expectedState)
    })

    it('should handle REGISTER_SUCCESS', () => {
        const action = {
            type: actionTypes.REGISTER_SUCCESS,
            payload: 'Registration successful',
        }
        const expectedState = {
            message: 'Registration successful',
            success: true,
        }

        expect(userRegister(initialState, action)).toEqual(expectedState)
    })

    it('should handle REGISTER_FAILURE', () => {
        const action = {
            type: actionTypes.REGISTER_FAILURE,
            payload: 'Error message',
        }
        const expectedState = { error: 'Error message' }

        expect(userRegister(initialState, action)).toEqual(expectedState)
    })
})
