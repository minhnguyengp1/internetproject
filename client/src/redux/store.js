import { configureStore } from '@reduxjs/toolkit'
import { userLogin, userRegister } from './reducers/authReducer.js'
import {
    strangerArticles,
    strangerDetails,
    userArticles,
    userDetails, userUpdate
} from './reducers/userReducer.js'
import { articleCreateReducer, articleDeleteReducer, articleUpdateReducer } from './reducers/articleReducer.js'
import { searchReducer } from './reducers/searchReducer.js'
import { reviewSubmitReducer, userReviewsReducer } from './reducers/reviewReducer.js'

const store = configureStore({
    reducer: {
        userLogin: userLogin,
        userRegister: userRegister,
        userDetails: userDetails,
        userArticles: userArticles,
        userUpdate: userUpdate,
        articleDelete: articleDeleteReducer,
        articleUpdate: articleUpdateReducer,
        articleCreate: articleCreateReducer,
        strangerDetails: strangerDetails,
        strangerArticles: strangerArticles,
        reviewSubmit: reviewSubmitReducer,
        userReviews: userReviewsReducer,
        search: searchReducer
    }
})

export default store
