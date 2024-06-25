import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import axios from 'axios'
import * as actionTypes from '../../constants/userActionTypes'
import * as actions from '../userActions'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
    userLogin: {
        accessToken: 'fakeAccessToken',
        userId: 1,
    },
}

describe('User Actions', () => {
    let store

    beforeEach(() => {
        store = mockStore(initialState)
        jest.clearAllMocks()
    })

    test('fetchUserDetails creates FETCH_USER_DETAILS_SUCCESS when fetching user details has been done', async () => {
        const mockData = { id: 1, name: 'Test User' }
        axios.get.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.FETCH_USER_DETAILS_REQUEST },
            { type: actionTypes.FETCH_USER_DETAILS_SUCCESS, payload: mockData },
        ]

        await store.dispatch(actions.fetchUserDetails())
        expect(store.getActions()).toEqual(expectedActions)
    })

    // test('fetchUserDetails creates FETCH_USER_DETAILS_FAILURE when fetching user details fails', async () => {
    //     const mockError = 'Failed to fetch user details'
    //     axios.get.mockRejectedValue({
    //         response: { data: { message: mockError } },
    //     })

    //     const expectedActions = [
    //         { type: actionTypes.FETCH_USER_DETAILS_REQUEST },
    //         {
    //             type: actionTypes.FETCH_USER_DETAILS_FAILURE,
    //             payload: { error: mockError },
    //         },
    //     ]

    //     await store.dispatch(actions.fetchUserDetails())
    //     expect(store.getActions()).toEqual(expectedActions)
    // })

    test('fetchUserArticles creates FETCH_USER_ARTICLES_SUCCESS when fetching user articles has been done', async () => {
        const mockData = [{ id: 1, title: 'Test Article' }]
        axios.get.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.FETCH_USER_ARTICLES_REQUEST },
            {
                type: actionTypes.FETCH_USER_ARTICLES_SUCCESS,
                payload: mockData,
            },
        ]

        await store.dispatch(actions.fetchUserArticles())
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchUserArticles creates FETCH_USER_ARTICLES_FAILURE when fetching user articles fails', async () => {
        const mockError = 'Failed to fetch user articles'
        axios.get.mockRejectedValue({
            response: { data: { message: mockError } },
        })

        const expectedActions = [
            { type: actionTypes.FETCH_USER_ARTICLES_REQUEST },
            {
                type: actionTypes.FETCH_USER_ARTICLES_FAILURE,
                payload: mockError,
            },
        ]

        await store.dispatch(actions.fetchUserArticles())
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('updateUserDetails creates UPDATE_USER_DETAILS_SUCCESS when updating user details has been done', async () => {
        axios.put.mockResolvedValue({})

        const formData = new FormData()
        formData.append('name', 'Updated User')

        const expectedActions = [
            { type: actionTypes.UPDATE_USER_DETAILS_REQUEST },
            { type: actionTypes.UPDATE_USER_DETAILS_SUCCESS },
        ]

        await store.dispatch(actions.updateUserDetails(formData))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('updateUserDetails creates UPDATE_USER_DETAILS_FAILURE when updating user details fails', async () => {
        const mockError = 'Failed to update user details'
        axios.put.mockRejectedValue({
            response: { data: { message: mockError } },
        })

        const formData = new FormData()
        formData.append('name', 'Updated User')

        const expectedActions = [
            { type: actionTypes.UPDATE_USER_DETAILS_REQUEST },
            {
                type: actionTypes.UPDATE_USER_DETAILS_FAILURE,
                payload: mockError,
            },
        ]

        await store.dispatch(actions.updateUserDetails(formData))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchStrangerDetails creates FETCH_STRANGER_DETAILS_SUCCESS when fetching stranger details has been done', async () => {
        const mockData = { id: 2, name: 'Stranger User' }
        axios.get.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.FETCH_STRANGER_DETAILS_REQUEST },
            {
                type: actionTypes.FETCH_STRANGER_DETAILS_SUCCESS,
                payload: mockData,
            },
        ]

        await store.dispatch(actions.fetchStrangerDetails(2))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchStrangerDetails creates FETCH_STRANGER_DETAILS_FAILURE when fetching stranger details fails', async () => {
        const mockError = 'Failed to fetch stranger details'
        axios.get.mockRejectedValue({
            response: { data: { message: mockError } },
        })

        const expectedActions = [
            { type: actionTypes.FETCH_STRANGER_DETAILS_REQUEST },
            {
                type: actionTypes.FETCH_STRANGER_DETAILS_FAILURE,
                payload: { error: mockError },
            },
        ]

        await store.dispatch(actions.fetchStrangerDetails(2))
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchStrangerArticles creates FETCH_STRANGER_ARTICLES_SUCCESS when fetching stranger articles has been done', async () => {
        const mockData = [{ id: 1, title: 'Stranger Article' }]
        axios.get.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.FETCH_STRANGER_ARTICLES_REQUEST },
            {
                type: actionTypes.FETCH_STRANGER_ARTICLES_SUCCESS,
                payload: mockData,
            },
        ]

        await store.dispatch(actions.fetchStrangerArticles(2))
        expect(store.getActions()).toEqual(expectedActions)
    })

    // test('fetchStrangerArticles creates FETCH_STRANGER_ARTICLES_FAILURE when fetching stranger articles fails', async () => {
    //     const mockError = 'Failed to fetch stranger articles'
    //     axios.get.mockRejectedValue({
    //         response: { data: { message: mockError } },
    //     })

    //     const expectedActions = [
    //         { type: actionTypes.FETCH_STRANGER_ARTICLES_REQUEST },
    //         {
    //             type: actionTypes.FETCH_STRANGER_ARTICLES_FAILURE,
    //             payload: mockError,
    //         },
    //     ]

    //     await store.dispatch(actions.fetchStrangerArticles(2))
    //     expect(store.getActions()).toEqual(expectedActions)
    // })
})
