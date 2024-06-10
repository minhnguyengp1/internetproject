import React, { useEffect, useState } from 'react'
import './headerStyle.scss'
import AppLogo from '../../assets/logoBlack.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserDetails } from '../../redux/actions/userActions.js'
import defaultAvatar from '../../assets/default-avatar.png'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.jsx'
import Search from '../Search/Search.jsx'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [userInfo, setUserInfo] = useState({
        fullName: ''
    })
    const [selectedCategory, setSelectedCategory] = useState('')
    const [query, setQuery] = useState('')

    const { isAuthenticated } = useSelector((state) => state.userLogin)

    const { error, userDetails } = useSelector((state) => state.userDetails)

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch])

    useEffect(() => {
        if (userDetails) {
            setUserInfo({
                fullName: userDetails.fullName || ''
            })
        }
    }, [userDetails])

    const handleLogout = () => {
        // dispatch(logoutThunk())
        navigate('/')
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const categoryPath = selectedCategory ? `/category/${selectedCategory}` : ''
        const searchPath = query ? `?q=${query}` : ''
        navigate(`/search${categoryPath}${searchPath}`)
        // const categoryPath = selectedCategory ? `/${selectedCategory}` : '/all';
        // const searchPath = query ? `/search?q=${query}` : '';
        // navigate(`${categoryPath}${searchPath}`);
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
                                    <p id="userName">{userInfo.fullName}</p>
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
                        <div className="input-with-dropdown">
                            <Search onSearch={setQuery} />
                            <CategoryDropdown
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />
                        </div>

                        <input type="text" placeholder="PLZ oder Ort" />
                        <button id="searchBtn" onClick={handleSearch}>
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
