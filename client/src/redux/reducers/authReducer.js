const initialState = {
    accessToken: localStorage.getItem('accessToken') || null,
    userId: localStorage.getItem('userId') || null,
    isAuthenticated: localStorage.getItem('accessToken') ? true : false,
    error: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                error: null,
            }
        case 'LOGIN_SUCCESS':
            localStorage.setItem('accessToken', action.payload.accessToken)
            localStorage.setItem('userId', action.payload.userId)
            return {
                ...state,
                accessToken: action.payload.accessToken,
                userId: action.payload.userId,
                isAuthenticated: true,
                error: null,
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: action.payload.error,
            }
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                error: null,
            }
        case 'REGISTER_FAILURE':
            return {
                ...state,
                error: action.payload.error,
            }
        case 'LOGOUT':
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userId')
            return {
                ...state,
                accessToken: null,
                userId: null,
                isAuthenticated: false,
                error: null,
            }
        default:
            return state
    }
}

export default authReducer
