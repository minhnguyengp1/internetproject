import { lazy } from 'react'

import { Navigate } from 'react-router-dom'

const Logout = lazy(() => import('@/pages/Logout.jsx'))
const NotFound = lazy(() => import('@/pages/NotFound.jsx'))

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Customer = lazy(() => import('@/pages/Customer'))
const Quote = lazy(() => import('@/pages/Quote/index'))
const QuoteCreate = lazy(() => import('@/pages/Quote/QuoteCreate'))
const QuoteRead = lazy(() => import('@/pages/Quote/QuoteRead'))
const QuoteUpdate = lazy(() => import('@/pages/Quote/QuoteUpdate'))
const PaymentUpdate = lazy(() => import('@/pages/Payment/PaymentUpdate'))
const Employee = lazy(() => import('@/pages/Employee'))
const Admin = lazy(() => import('@/pages/Admin'))
const Settings = lazy(() => import('@/pages/Settings/Settings'))
const PaymentMode = lazy(() => import('@/pages/PaymentMode'))
const ProductCategory = lazy(() => import('@/pages/ProductCategory'))
const Product = lazy(() => import('@/pages/Product'))

const People = lazy(() => import('@/pages/People'))
const Company = lazy(() => import('@/pages/Company'))

const About = lazy(() => import('@/pages/About'))

let routes = {
    expense: [],
    default: [
        {
            path: '/login',
            element: <Navigate to="/" />,
        },
        {
            path: '/logout',
            element: <Navigate to="/" />,
        },
        {
            path: '/verify/*',
            element: <Navigate to="/" />,
        },
        {
            path: '/resetpassword/*',
            element: <Navigate to="/" />,
        },
        {
            path: '/logout',
            element: <Logout />,
        },
        {
            path: '/about',
            element: <About />,
        },
        {
            path: '/',
            element: <Dashboard />,
        },
        {
            path: '/customer',
            element: <Customer />,
        },
        {
            path: '/people',
            element: <People />,
        },
        {
            path: '/company',
            element: <Company />,
        },
        {
            path: '/product',
            element: <Product />,
        },
        {
            path: '/category/product',
            element: <ProductCategory />,
        },
        {
            path: '/quote',
            element: <Quote />,
        },
        {
            path: '/quote/create',
            element: <QuoteCreate />,
        },
        {
            path: '/quote/read/:id',
            element: <QuoteRead />,
        },
        {
            path: '/quote/update/:id',
            element: <QuoteUpdate />,
        },
        {
            path: '/payment/update/:id',
            element: <PaymentUpdate />,
        },
        {
            path: '/employee',
            element: <Employee />,
        },
        {
            path: '/admin',
            element: <Admin />,
        },
        {
            path: '/settings',
            element: <Settings />,
        },
        {
            path: '/settings/edit/:settingsKey',
            element: <Settings />,
        },
        {
            path: '/payment/mode',
            element: <PaymentMode />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ],
}

export default routes
