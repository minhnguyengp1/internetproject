import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './styles/main.scss'
import React from 'react'
import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import Register from './pages/register/Register.jsx'
import Article from './pages/article/Article.jsx'
import Create from './pages/articleCreate/Create.jsx'
import Dashboard from './pages/profile/Dashboard.jsx'
import ProfileInfo from './pages/profile/ProfileInfo.jsx'
import UserLayout from './components/profilePage/UserLayout.jsx'
import PrivateRoute from './pages/PrivateRoute.jsx'

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },

            {
                path: '/article',
                element: <Article />,
            },

            {
                path: '/article/create',
                element: <Create></Create>,
            },
            {
                path: '/user/*',
                element: <UserLayout />,
                children: [
                    { path: '', element: <Dashboard /> },
                    { path: 'personal-info', element: <ProfileInfo /> },
                ],
            },
        ],
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
])

function App() {
    return (
        <div className="app">
            <div className="container">
                <RouterProvider router={router} />
            </div>
        </div>
    )
}

export default App
