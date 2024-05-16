import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer.js'
import {
    userArticlesReducer,
    userDetailsReducer,
} from './reducers/userReducer.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        userDetails: userDetailsReducer,
        userArticles: userArticlesReducer,
    },
})

export default store
