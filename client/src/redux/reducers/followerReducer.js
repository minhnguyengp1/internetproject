import * as actionTypes from '../constants/followerActionTypes.js'

const initialFollowersListState = {
    loading: false,
    followers: [],
    error: null
}

const initialFollowerAddState = {
    loading: false,
    success: false,
    error: null
}

const initialFollowerRemoveState = {
    loading: false,
    success: false,
    error: null
}

export const followersListReducer = (state = initialFollowersListState, action) => {
    switch (action.type) {
        case actionTypes.FOLLOWERS_LIST_REQUEST:
            return { ...state, loading: true }
        case actionTypes.FOLLOWERS_LIST_SUCCESS:
            return { ...state, loading: false, followers: action.payload, error: null }
        case actionTypes.FOLLOWERS_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export const followerAddReducer = (state = initialFollowerAddState, action) => {
    switch (action.type) {
        case actionTypes.FOLLOWER_ADD_REQUEST:
            return { ...state, loading: true }
        case actionTypes.FOLLOWER_ADD_SUCCESS:
            return { ...state, loading: false, success: true, error: null }
        case actionTypes.FOLLOWER_ADD_FAIL:
            return { ...state, loading: false, success: false, error: action.payload }
        default:
            return state
    }
}

export const followerRemoveReducer = (state = initialFollowerRemoveState, action) => {
    switch (action.type) {
        case actionTypes.FOLLOWER_REMOVE_REQUEST:
            return { ...state, loading: true }
        case actionTypes.FOLLOWER_REMOVE_SUCCESS:
            return { ...state, loading: false, success: true, error: null }
        case actionTypes.FOLLOWER_REMOVE_FAIL:
            return { ...state, loading: false, success: false, error: action.payload }
        default:
            return state
    }
}