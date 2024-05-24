import React, { useEffect, useState } from 'react'
import './headerStyle.scss'
import AppLogo from '../assets/logoBlack.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch, FaUser } from 'react-icons/fa'
// import { logoutThunk } from '../redux/actions/authActions'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserDetails } from '../redux/actions/userActions.js'
import defaultAvatar from '../assets/default-avatar.png'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [userDetails, setUserDetails] = useState({
        fullName: ''
    })

    const { isAuthenticated } = useSelector((state) => state.userLogin)

    const { error, userDetails: reduxUserDetails } = useSelector((state) => state.userDetails)

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch])

    useEffect(() => {
        if (reduxUserDetails) {
            setUserDetails({
                fullName: reduxUserDetails.fullName || ''
            })
        }
    }, [reduxUserDetails])

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
