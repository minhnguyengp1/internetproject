import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login/Login.jsx'
import Register from '../pages/Register/Register.jsx'
import ProtectedRoute from './protected.route.jsx'
import Home from '../pages/Home/Home.jsx'
import Dashboard from '../pages/profile/Dashboard/Dashboard.jsx'
import ProfileInfo from '../pages/profile/ProfileInfo/ProfileInfo.jsx'
import ArticleList from '../pages/profile/ArticleList/ArticleList.jsx'
import CreateArticle from '../pages/CreateArticle/CreateArticle.jsx'
import SearchResults from '../pages/SearchResults/SearchResults.jsx'
import SuccessCreate from '../pages/SuccessCreate/SuccessCreate.jsx'
import ReviewCard from '../components/ReviewCard/ReviewCard.jsx'
import OtherUserView from '../pages/OtherUserView/OtherUserView.jsx'
import UserReviews from '../pages/profile/UserReviews/UserReviews.jsx'
import UserChat from '../pages/UserChat/UserChat.jsx'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword.jsx'
import ResetPassword from '../pages/ResetPassword/ResetPassword.jsx'
import ArticleDetails from '../pages/ArticleDetails/ArticleDetails.jsx'
import Watchlist from '../pages/WatchList/Watchlist.jsx'
import FollowerList from '../pages/FollowerList/FollowerList.jsx'
import Settings from '../pages/Settings/Settings.jsx'
import UpdateArticle from '../pages/UpdateArticle/UpdateArticle.jsx'
import SuccessUpdate from '../pages/SuccessUpdate/SuccessUpdate.jsx'
import FollowingList from '../pages/FollowingList/FollowingList.jsx'

function RootRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute component={Home} />} />
                <Route path="/article/:articleId" element={<ProtectedRoute component={ArticleDetails} />} />
                <Route path="/create-article" element={<ProtectedRoute component={CreateArticle} />} />
                <Route path="/update-article/:articleId" element={<ProtectedRoute component={UpdateArticle} />} />
                <Route path="/create-success" element={<ProtectedRoute component={SuccessCreate} />} />
                <Route path="/update-success" element={<ProtectedRoute component={SuccessUpdate} />} />
                <Route path="/user" element={<ProtectedRoute component={Dashboard} />} />
                <Route path="/other-user/:strangerId" element={<ProtectedRoute component={OtherUserView} />} />
                <Route path="/user/personal-info" element={<ProtectedRoute component={ProfileInfo} />} />
                <Route path="/user/settings" element={<ProtectedRoute component={Settings} />} />
                <Route path="/user/articles" element={<ProtectedRoute component={ArticleList} />} />
                <Route path="/user/reviews" element={<ProtectedRoute component={UserReviews} />} />
                <Route path="/user/watchlist" element={<ProtectedRoute component={Watchlist} />} />
                <Route path="/user/follower-list" element={<ProtectedRoute component={FollowerList} />} />
                <Route path="/user/following-list" element={<ProtectedRoute component={FollowingList} />} />
                <Route path="/test" element={<ProtectedRoute component={ReviewCard} />} />
                <Route path="/search/*" element={<SearchResults />} />
                <Route path="/chat" element={<ProtectedRoute component={UserChat} />} />
                <Route exact={true} path="/login" element={<Login />} />
                <Route exact={true} path="/register" element={<Register />} />
                <Route exact={true} path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

            </Routes>
        </BrowserRouter>
    )
}

export default RootRoutes
