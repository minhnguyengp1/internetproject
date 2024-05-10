// Header.jsx
import './header.scss'
import AppLogo from '../assets/logoBlack.png'
import { useSearch } from '../context/SearchContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { logoutThunk } from '../redux/actions/authActions'
import { useSelector, useDispatch } from 'react-redux'
import { Input } from 'antd'
const { Search } = Input

const Header = () => {
    const { setSearchTerm } = useSearch()

    const onSearch = (value) => {
        setSearchTerm(value)
    }

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userEmail = useSelector((state) => state.auth.currentUser?.email)
    const location = useLocation()

    const handleLogout = () => {
        dispatch(logoutThunk())
        navigate('/')
    }

    const handleLogoClick = () => {
        if (location.pathname !== '/') {
            navigate('/')
        }
        window.location.reload()
    }

    const isLoginOrRegister =
        location.pathname === '/login' || location.pathname === '/register'

    return (
        <div className="header">
            <div className="top">
                <Link id="homeLink" to={'/'} onClick={handleLogoClick}>
                    <img className="imageLogo" src={AppLogo} alt="yabe" />
                </Link>
                <form className="buttonsTop">
                    {!isLoginOrRegister && (
                        <>
                            {!isAuthenticated ? (
                                <>
                                    <button className="buttonRegister">
                                        <span>
                                            <Link to="/register">
                                                Registrieren{' '}
                                            </Link>
                                        </span>
                                    </button>
                                    <span>oder</span>
                                    <button className="buttonEinloggen">
                                        <span>
                                            <Link to="/login">Einloggen</Link>
                                        </span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p id="userName">{userEmail}</p>
                                    <button
                                        onClick={handleLogout}
                                        className="buttonLogout"
                                    >
                                        Ausloggen
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </form>
            </div>

            <div className="down">
                {!isLoginOrRegister ? (
                    <div className="buttonsDown">
                        <Search
                            placeholder="input search text"
                            onSearch={onSearch}
                            enterButton
                            allowClear
                            size="large"
                            className="searchBar"
                        />
                        <button id="accountBtn">
                            <FaUser /> Mein Profil
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default Header
