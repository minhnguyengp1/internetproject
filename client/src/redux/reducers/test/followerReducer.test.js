import {
    followerListReducer,
    followingListReducer,
    followerRemoveReducer,
    followUserReducer,
    unfollowUserReducer,
} from '../followerReducer'
import * as actionTypes from '../../constants/followerActionTypes'

describe('followerListReducer', () => {
    const initialState = {
        loading: false,
        followers: [],
        error: null,
    }

    it('should return the initial state', () => {
        expect(followerListReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle FOLLOWERS_LIST_REQUEST', () => {
        const action = { type: actionTypes.FOLLOWERS_LIST_REQUEST }
        const expectedState = { ...initialState, loading: true }

        expect(followerListReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FOLLOWERS_LIST_SUCCESS', () => {
        const payload = [{ id: 1, name: 'Follower 1' }]
        const action = { type: actionTypes.FOLLOWERS_LIST_SUCCESS, payload }
        const expectedState = {
            ...initialState,
            loading: false,
            followers: payload,
        }

        expect(followerListReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FOLLOWERS_LIST_FAIL', () => {
        const payload = 'Error message'
        const action = { type: actionTypes.FOLLOWERS_LIST_FAIL, payload }
        const expectedState = {
            ...initialState,
            loading: false,
            error: payload,
        }

        expect(followerListReducer(initialState, action)).toEqual(expectedState)
    })
})

describe('followingListReducer', () => {
    const initialState = {
        loading: false,
        following: [],
        error: null,
    }

    it('should return the initial state', () => {
        expect(followingListReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle FOLLOWING_LIST_REQUEST', () => {
        const action = { type: actionTypes.FOLLOWING_LIST_REQUEST }
        const expectedState = { ...initialState, loading: true }

        expect(followingListReducer(initialState, action)).toEqual(
            expectedState
        )
    })

    it('should handle FOLLOWING_LIST_SUCCESS', () => {
        const payload = [{ id: 1, name: 'Following 1' }]
        const action = { type: actionTypes.FOLLOWING_LIST_SUCCESS, payload }
        const expectedState = {
            loading: false,
            following: payload,
            error: null,
        }

        expect(followingListReducer(initialState, action)).toEqual(
            expectedState
        )
    })

    it('should handle FOLLOWING_LIST_FAIL', () => {
        const payload = 'Error message'
        const action = { type: actionTypes.FOLLOWING_LIST_FAIL, payload }
        const expectedState = { loading: false, following: [], error: payload }

        expect(followingListReducer(initialState, action)).toEqual(
            expectedState
        )
    })
})

describe('followerRemoveReducer', () => {
    const initialState = {
        loading: false,
        success: false,
        error: null,
    }

    it('should return the initial state', () => {
        expect(followerRemoveReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle FOLLOWER_REMOVE_REQUEST', () => {
        const action = { type: actionTypes.FOLLOWER_REMOVE_REQUEST }
        const expectedState = { ...initialState, loading: true }

        expect(followerRemoveReducer(initialState, action)).toEqual(
            expectedState
        )
    })

    it('should handle FOLLOWER_REMOVE_SUCCESS', () => {
        const action = { type: actionTypes.FOLLOWER_REMOVE_SUCCESS }
        const expectedState = { ...initialState, loading: false, success: true }

        expect(followerRemoveReducer(initialState, action)).toEqual(
            expectedState
        )
    })

    it('should handle FOLLOWER_REMOVE_FAIL', () => {
        const payload = 'Error message'
        const action = { type: actionTypes.FOLLOWER_REMOVE_FAIL, payload }
        const expectedState = {
            ...initialState,
            loading: false,
            success: false,
            error: payload,
        }

        expect(followerRemoveReducer(initialState, action)).toEqual(
            expectedState
        )
    })
})

describe('followUserReducer', () => {
    const initialState = {
        loading: false,
        success: false,
        error: null,
    }

    it('should return the initial state', () => {
        expect(followUserReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle FOLLOW_USER_REQUEST', () => {
        const action = { type: actionTypes.FOLLOW_USER_REQUEST }
        const expectedState = { loading: true }

        expect(followUserReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FOLLOW_USER_SUCCESS', () => {
        const action = { type: actionTypes.FOLLOW_USER_SUCCESS }
        const expectedState = { loading: false, success: true }

        expect(followUserReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle FOLLOW_USER_FAIL', () => {
        const payload = 'Error message'
        const action = { type: actionTypes.FOLLOW_USER_FAIL, payload }
        const expectedState = { loading: false, error: payload }

        expect(followUserReducer(initialState, action)).toEqual(expectedState)
    })
})

describe('unfollowUserReducer', () => {
    const initialState = {
        loading: false,
        success: false,
        error: null,
    }

    it('should return the initial state', () => {
        expect(unfollowUserReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle UNFOLLOW_USER_REQUEST', () => {
        const action = { type: actionTypes.UNFOLLOW_USER_REQUEST }
        const expectedState = { loading: true }

        expect(unfollowUserReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle UNFOLLOW_USER_SUCCESS', () => {
        const action = { type: actionTypes.UNFOLLOW_USER_SUCCESS }
        const expectedState = { loading: false, success: true }

        expect(unfollowUserReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle UNFOLLOW_USER_FAIL', () => {
        const payload = 'Error message'
        const action = { type: actionTypes.UNFOLLOW_USER_FAIL, payload }
        const expectedState = { loading: false, error: payload }

        expect(unfollowUserReducer(initialState, action)).toEqual(expectedState)
    })
})
