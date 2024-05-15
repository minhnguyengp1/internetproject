import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    console.log('isAuthenticated: ' + isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default PrivateRoute
