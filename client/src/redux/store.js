import { configureStore } from '@reduxjs/toolkit'
import { userLogin, userRegister } from './reducers/authReducer.js'
import {
    userArticlesReducer,
    userDetailsReducer
} from './reducers/userReducer.js'

const store = configureStore({
    reducer: {
        userLogin: userLogin,
        userRegister: userRegister,
        userDetails: userDetailsReducer,
        userArticles: userArticlesReducer
    }
})

export default store
