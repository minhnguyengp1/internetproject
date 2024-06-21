import { configureStore } from '@reduxjs/toolkit'
import { userLogin, userRegister } from './reducers/authReducer.js'
import {
    strangerArticles,
    strangerDetails,
    userArticles,
    userDetails,
    userUpdate,
} from './reducers/userReducer.js'
import {
    articleCreateReducer,
    articleDeleteReducer,
    articleListReducer,
    articleUpdateReducer,
} from './reducers/articleReducer.js'
import { searchReducer } from './reducers/searchReducer.js'
import {
    reviewSubmitReducer,
    userReviewsReducer,
} from './reducers/reviewReducer.js'
import { conversationListReducer } from './reducers/conversationReducer.js'
import { messageListReducer } from './reducers/messageReducer.js'

const store = configureStore({
    reducer: {
        userLogin: userLogin,
        userRegister: userRegister,
        userDetails: userDetails,
        userArticles: userArticles,
        userUpdate: userUpdate,
        articleList: articleListReducer,
        articleDelete: articleDeleteReducer,
        articleUpdate: articleUpdateReducer,
        articleCreate: articleCreateReducer,
        strangerDetails: strangerDetails,
        strangerArticles: strangerArticles,
        reviewSubmit: reviewSubmitReducer,
        userReviews: userReviewsReducer,
        search: searchReducer,
        conversationList: conversationListReducer,
        messageList: messageListReducer,
    },
})

export default store
