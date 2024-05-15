import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer.js'
import { userDetailsReducer } from './reducers/userReducer.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        userDetails: userDetailsReducer,
    },
})

export default store
