import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer.js'

const store = configureStore({
    reducer: {
        auth: authReducer, // Register your reducer(s) with the store
    },
})

export default store
