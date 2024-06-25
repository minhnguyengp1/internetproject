import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import axios from 'axios'
import * as actionTypes from '../../constants/authActionTypes'
import * as actions from '../authActions'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Auth Actions', () => {
    let store

    beforeEach(() => {
        store = mockStore({})
        jest.clearAllMocks()
    })

    test('login creates LOGIN_SUCCESS when logging in has been done', async () => {
        const mockData = { accessToken: 'fakeAccessToken', userId: 1 }
        axios.post.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.LOGIN_REQUEST },
            {
                type: actionTypes.LOGIN_SUCCESS,
                payload: { userId: 1, accessToken: 'fakeAccessToken' },
            },
        ]

        await store.dispatch(
            actions.login({
                email: 'test@example.com',
                password: 'password123',
            })
        )
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('login creates LOGIN_FAILURE when logging in fails', async () => {
        const mockError = 'Login failed'
        axios.post.mockRejectedValue({ response: { data: mockError } })

        const expectedActions = [
            { type: actionTypes.LOGIN_REQUEST },
            { type: actionTypes.LOGIN_FAILURE, payload: mockError },
        ]

        await store.dispatch(
            actions.login({
                email: 'test@example.com',
                password: 'password123',
            })
        )
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('register creates REGISTER_SUCCESS when registration has been done', async () => {
        axios.post.mockResolvedValue({})

        const expectedActions = [
            { type: actionTypes.REGISTER_REQUEST },
            { type: actionTypes.REGISTER_SUCCESS },
        ]

        await store.dispatch(
            actions.register({
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            })
        )
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('register creates REGISTER_FAILURE when registration fails', async () => {
        const mockError = 'Registration failed'
        axios.post.mockRejectedValue({ response: { data: mockError } })

        const expectedActions = [
            { type: actionTypes.REGISTER_REQUEST },
            { type: actionTypes.REGISTER_FAILURE, payload: mockError },
        ]

        await store.dispatch(
            actions.register({
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            })
        )
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('logout creates LOGOUT action', () => {
        const expectedAction = { type: actionTypes.LOGOUT }

        store.dispatch(actions.logout())
        expect(store.getActions()).toEqual([expectedAction])
    })
})
