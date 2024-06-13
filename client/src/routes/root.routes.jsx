import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login/Login.jsx'
import Register from '../pages/register/Register.jsx'
import ProtectedRoute from './protected.route.jsx'
import Home from '../pages/home/Home.jsx'
import Article from '../pages/article/Article.jsx'
import Dashboard from '../pages/profile/dashboard/Dashboard.jsx'
import ProfileInfo from '../pages/profile/profileInfo/ProfileInfo.jsx'
import ArticleList from '../pages/profile/articleList/ArticleList.jsx'
import CreateArticle from '../pages/CreateArticle/CreateArticle.jsx'
import SearchResults from '../pages/SearchResults/SearchResults.jsx'
import SuccessCreate from '../pages/SuccessCreate/SuccessCreate.jsx'
import OtherUserView from "../pages/OtherUserView/OtherUserView.jsx";

function RootRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute component={Home} />} />
                <Route path="/article" element={<ProtectedRoute component={Article} />} />
                <Route path="/article-create" element={<ProtectedRoute component={CreateArticle} />} />
                <Route path="/article-create/success" element={<ProtectedRoute component={SuccessCreate} />} />
                <Route path="/user" element={<ProtectedRoute component={Dashboard} />} />
                <Route path="/other-user" element={<ProtectedRoute component={OtherUserView} />} />
                <Route path="/user/personal-info" element={<ProtectedRoute component={ProfileInfo} />} />
                <Route path="/user/articles" element={<ProtectedRoute component={ArticleList} />} />
                <Route path="/search/*" element={<SearchResults />} />
                <Route exact={true} path="/login" element={<Login />} />
                <Route exact={true} path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RootRoutes
