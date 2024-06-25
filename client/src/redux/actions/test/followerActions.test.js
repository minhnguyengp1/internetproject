import configureMockStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import axios from 'axios'
import * as actionTypes from '../../constants/followerActionTypes'
import * as actions from '../followerActions'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initialState = {
    userLogin: {
        accessToken: 'fakeAccessToken',
        userId: 1,
    },
    fetchUserWatchlist: {
        watchlist: [],
    },
}

describe('Follower Actions', () => {
    let store

    beforeEach(() => {
        store = mockStore(initialState)
        jest.clearAllMocks()
    })

    test('fetchFollowersList creates FOLLOWERS_LIST_SUCCESS when fetching followers list has been done', async () => {
        const mockData = [{ id: 1, name: 'Test Follower' }]
        axios.get.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.FOLLOWERS_LIST_REQUEST },
            { type: actionTypes.FOLLOWERS_LIST_SUCCESS, payload: mockData },
        ]

        await store.dispatch(actions.fetchFollowersList())
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchFollowersList creates FOLLOWERS_LIST_FAIL when fetching followers list fails', async () => {
        const mockError = 'Failed to fetch followers'
        axios.get.mockRejectedValue({
            response: { data: { message: mockError } },
        })

        const expectedActions = [
            { type: actionTypes.FOLLOWERS_LIST_REQUEST },
            { type: actionTypes.FOLLOWERS_LIST_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.fetchFollowersList())
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchFollowingList creates FOLLOWING_LIST_SUCCESS when fetching following list has been done', async () => {
        const mockData = [{ id: 1, name: 'Test Following' }]
        axios.get.mockResolvedValue({ data: mockData })

        const expectedActions = [
            { type: actionTypes.FOLLOWING_LIST_REQUEST },
            { type: actionTypes.FOLLOWING_LIST_SUCCESS, payload: mockData },
        ]

        await store.dispatch(actions.fetchFollowingList())
        expect(store.getActions()).toEqual(expectedActions)
    })

    test('fetchFollowingList creates FOLLOWING_LIST_FAIL when fetching following list fails', async () => {
        const mockError = 'Failed to fetch following'
        axios.get.mockRejectedValue({
            response: { data: { message: mockError } },
        })

        const expectedActions = [
            { type: actionTypes.FOLLOWING_LIST_REQUEST },
            { type: actionTypes.FOLLOWING_LIST_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.fetchFollowingList())
        expect(store.getActions()).toEqual(expectedActions)
    })

    // test('removeFollower creates FOLLOWER_REMOVE_SUCCESS when removing follower has been done', async () => {
    //     axios.delete.mockResolvedValue({})
    //     axios.get.mockResolvedValue({ data: [] }) // Mocking fetchFollowersList response

    //     const expectedActions = [
    //         { type: actionTypes.FOLLOWER_REMOVE_REQUEST },
    //         { type: actionTypes.FOLLOWER_REMOVE_SUCCESS },
    //         { type: actionTypes.FOLLOWERS_LIST_REQUEST },
    //         { type: actionTypes.FOLLOWERS_LIST_SUCCESS, payload: [] },
    //     ]

    //     await store.dispatch(actions.removeFollower(2))
    //     expect(store.getActions()).toEqual(expectedActions)
    // })

    test('removeFollower creates FOLLOWER_REMOVE_FAIL when removing follower fails', async () => {
        const mockError = 'Failed to remove follower'
        axios.delete.mockRejectedValue({
            response: { data: { message: mockError } },
        })

        const expectedActions = [
            { type: actionTypes.FOLLOWER_REMOVE_REQUEST },
            { type: actionTypes.FOLLOWER_REMOVE_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.removeFollower(2))
        expect(store.getActions()).toEqual(expectedActions)
    })

    // test('followUser creates FOLLOW_USER_SUCCESS when following user has been done', async () => {
    //     axios.put.mockResolvedValue({})
    //     axios.get.mockResolvedValue({ data: [] }) // Mocking fetchFollowingList response

    //     const expectedActions = [
    //         { type: actionTypes.FOLLOW_USER_REQUEST },
    //         { type: actionTypes.FOLLOW_USER_SUCCESS },
    //         { type: actionTypes.FOLLOWING_LIST_REQUEST },
    //         { type: actionTypes.FOLLOWING_LIST_SUCCESS, payload: [] },
    //     ]

    //     await store.dispatch(actions.followUser(2))
    //     expect(store.getActions()).toEqual(expectedActions)
    // })

    test('followUser creates FOLLOW_USER_FAIL when following user fails', async () => {
        const mockError = 'Failed to follow user'
        axios.put.mockRejectedValue({
            response: { data: { message: mockError } },
        })

        const expectedActions = [
            { type: actionTypes.FOLLOW_USER_REQUEST },
            { type: actionTypes.FOLLOW_USER_FAIL, payload: mockError },
        ]

        await store.dispatch(actions.followUser(2))
        expect(store.getActions()).toEqual(expectedActions)
    })

    // test('unfollowUser creates UNFOLLOW_USER_SUCCESS when unfollowing user has been done', async () => {
    //     axios.delete.mockResolvedValue({})
    //     axios.get.mockResolvedValue({ data: [] }) // Mocking fetchFollowingList response

    //     const expectedActions = [
    //         { type: actionTypes.UNFOLLOW_USER_REQUEST },
    //         { type: actionTypes.UNFOLLOW_USER_SUCCESS },
    //         { type: actionTypes.FOLLOWING_LIST_REQUEST },
    //         { type: actionTypes.FOLLOWING_LIST_SUCCESS, payload: [] },
    //     ]

    //     await store.dispatch(actions.unfollowUser(2))
    //     expect(store.getActions()).toEqual(expectedActions)
    // })

    // test('unfollowUser creates UNFOLLOW_USER_FAIL when unfollowing user fails', async () => {
    //     const mockError = 'Failed to unfollow user'
    //     axios.delete.mockRejectedValue({
    //         response: { data: { message: mockError } },
    //     })

    //     const expectedActions = [
    //         { type: actionTypes.UNFOLLOW_USER_REQUEST },
    //         { type: actionTypes.UNFOLLOW_USER_FAIL, payload: mockError },
    //     ]

    //     await store.dispatch(actions.unfollowUser(2))
    //     expect(store.getActions()).toEqual(expectedActions)
    // })
})
