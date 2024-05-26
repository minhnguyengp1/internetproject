import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/login/Login.jsx'
import Register from '../pages/register/Register.jsx'
import ProtectedRoute from './protected.route.jsx'
import Home from '../pages/home/Home.jsx'
import Article from '../pages/article/Article.jsx'
import Dashboard from '../pages/profile/Dashboard.jsx'
import ProfileInfo from '../pages/profile/ProfileInfo.jsx'
import UserArticles from '../pages/profile/UserArticles.jsx'
import CreateArticle from '../pages/articleCreate/CreateArticle.jsx'

function RootRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/article/:id" element={<Article />} />
                <Route
                    path="/article/create"
                    element={<ProtectedRoute component={CreateArticle} />}
                />
                <Route
                    path="/user"
                    element={<ProtectedRoute component={Dashboard} />}
                />
                <Route
                    path="/user/personal-info"
                    element={<ProtectedRoute component={ProfileInfo} />}
                />
                <Route
                    path="/user/articles"
                    element={<ProtectedRoute component={UserArticles} />}
                />
                <Route exact={true} path="/login" element={<Login />} />
                <Route exact={true} path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RootRoutes
