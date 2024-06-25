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
    articleDetailsReducer,
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
import {
    addToWatchlistReducer,
    fetchUserWatchlistReducer,
    removeFromWatchlistReducer,
} from './reducers/watchlistReducer.js'
import {
    followerRemoveReducer,
    followerListReducer,
    followingListReducer,
    followUserReducer,
    unfollowUserReducer,
} from './reducers/followerReducer.js'

const store = configureStore({
    reducer: {
        userLogin: userLogin,
        userRegister: userRegister,
        userDetails: userDetails,
        userArticles: userArticles,
        userUpdate: userUpdate,
        articleList: articleListReducer,
        articleDetails: articleDetailsReducer,
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
        fetchUserWatchlist: fetchUserWatchlistReducer,
        addToWatchlist: addToWatchlistReducer,
        removeFromWatchlist: removeFromWatchlistReducer,
        followerList: followerListReducer,
        followingList: followingListReducer,
        followerRemove: followerRemoveReducer,
        followUser: followUserReducer,
        unfollowUser: unfollowUserReducer,
    },
})

export default store
