import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/authReducer.js'
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
} from './reducers/userReducer.js'

const store = configureStore({
    reducer: {
        auth: authReducer, // Register your reducer(s) with the store
        userRegister: userRegisterReducer,
        userLogin: userLoginReducer,
        userDetails: userDetailsReducer,
    },
})

export default store
