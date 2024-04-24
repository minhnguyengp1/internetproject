import { combineReducers } from 'redux'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    auth: authReducer, // This could be expanded with other reducers
})

export default rootReducer
