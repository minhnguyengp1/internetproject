// userReducer.js
const initialState = {
    userDetails: null,
    error: null,
}

export const userDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_DETAILS_REQUEST':
            return {
                ...state,
                error: null,
            }
        case 'FETCH_USER_DETAILS_SUCCESS':
            return {
                ...state,
                userDetails: action.payload.userDetails,
                error: null,
            }
        case 'FETCH_USER_DETAILS_FAILURE':
            return {
                ...state,
                error: action.payload.error,
            }
        default:
            return state
    }
}
