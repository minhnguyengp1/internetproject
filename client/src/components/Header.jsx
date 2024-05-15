import React from 'react'
import './headerStyle.scss'
import AppLogo from '../assets/logoBlack.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch, FaUser } from 'react-icons/fa'
// import { logoutThunk } from '../redux/actions/authActions'
import { useSelector, useDispatch } from 'react-redux'

const Header = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userEmail = useSelector((state) => state.auth.currentUser?.email)
    const location = useLocation()

    const handleLogout = () => {
        // dispatch(logoutThunk())
        navigate('/')
    }

    const isLoginOrRegister =
        location.pathname === '/login' || location.pathname === '/register'

    return (
        <div className="header">
            <div className="top">
                <Link id="homeLink" to={'/'}>
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
                    <form className="buttonsDown">
                        <input type="text" placeholder="was suchen Sie?" />
                        <input type="text" placeholder="PLZ oder Ort" />
                        <button id="searchBtn">
                            <FaSearch /> Finden
                        </button>
                        <button id="accountBtn">
                            <FaUser /> Mein Profil
                        </button>
                    </form>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default Header
