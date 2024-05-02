import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './styles/main.scss'
import React from 'react'
import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import Register from './pages/register/Register.jsx'
import Article from './pages/article/Article.jsx'
import CreateArticle from './pages/articleCreate/CreateArticle.jsx'
import Dashboard from './pages/profile/Dashboard.jsx'
import UserLayout from './components/profilePage/UserLayout.jsx'

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
                element: <CreateArticle />,
            },
            {
                path: '/user', // Base path for user-related routes
                element: <UserLayout />, // Layout containing SideMenu and Outlet
                children: [
                    { path: '', element: <Dashboard /> }, // Component for /user/dashboard
                    // { path: 'inventory', element: <Inventory /> }, // Component for /user/inventory
                    // { path: 'settings', element: <Settings /> }, // Component for /user/settings
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
