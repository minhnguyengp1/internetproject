import React, { useEffect, useState } from 'react'
import './header.scss'
import AppLogo from '../assets/logoBlack.png'
import { useSearch } from '../context/SearchContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
//import { logoutThunk } from '../redux/actions/authActions'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserDetails } from '../redux/actions/userActions.js'
import defaultAvatar from '../assets/default-avatar.png'

import { Input } from 'antd'
const { Search } = Input

const Header = () => {
    const { setSearchTerm } = useSearch()

    const onSearch = (value) => {
        setSearchTerm(value)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [userDetails, setUserDetails] = useState({
        fullName: '',
    })

    const { isAuthenticated } = useSelector((state) => state.userLogin)

    const { error, userDetails: reduxUserDetails } = useSelector(
        (state) => state.userDetails
    )

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch])

    useEffect(() => {
        if (reduxUserDetails) {
            setUserDetails({
                fullName: reduxUserDetails.fullName || '',
            })
        }
    }, [reduxUserDetails])

    const handleLogout = () => {
        // dispatch(logoutThunk())
        navigate('/')
    }

    const handleLogoClick = () => {
        if (location.pathname !== '/') {
            navigate('/')
        }
        window.location.reload()
    }

    const isLoginPage = location.pathname === '/login'

    const isRegisterPage = location.pathname === '/register'

    return (
        <div className="header">
            <div className="top">
                <Link id="homeLink" to={'/'} onClick={handleLogoClick}>
                    <img className="imageLogo" src={AppLogo} alt="yabe" />
                </Link>
                <form className="buttonsTop">
                    {isLoginPage && (
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
                    {isRegisterPage && (
                        <>
                            {!isAuthenticated ? (
                                <>
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
                    {!isLoginPage && !isRegisterPage && (
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
                                    <button className="buttonEinloggen">
                                        <span>
                                            <Link to="/login">Einloggen</Link>
                                        </span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p id="userName">{userDetails.fullName}</p>
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
                {!isLoginPage && !isRegisterPage ? (
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
