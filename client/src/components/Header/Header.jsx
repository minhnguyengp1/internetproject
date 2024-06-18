import React, { useEffect, useState } from 'react'
import './header.scss'
import AppLogo from '../../assets/logoBlack.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaPlus, FaSearch, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserDetails } from '../../redux/actions/userActions.js'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.jsx'
import BundeslandAutocomplete from '../BundeslandAutocomplete/BundeslandAutocomplete.jsx'
import { logout } from '../../redux/actions/authActions.js'
import CityDropdown from '../CityDropdown/CityDropdown.jsx'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [userInfo, setUserInfo] = useState({
        fullName: ''
    })
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [query, setQuery] = useState('')

    const { isAuthenticated } = useSelector((state) => state.userLogin)

    const { userDetails } = useSelector((state) => state.userDetails)

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

    const handleLogoutClick = () => {
        dispatch(logout())
        navigate('/')
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const categoryPath = selectedCategory ? `/category/${selectedCategory}` : ''
        const searchPath = query ? `?q=${query}` : ''
        const cityPath = selectedCity ? `&place=${selectedCity}` : ''
        navigate(`/search${categoryPath}${searchPath}${cityPath}`)
    }

    const handleProfileClick = () => {
        navigate('/user')
    }

    const handleNewArticle = () => {
        navigate('/create-article')
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
                                        onClick={handleLogoutClick}
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

            <div className="function-bar-container">
                {!isLoginOrRegister ? (
                    <div className="function-bar">
                        <div className="input-with-dropdown">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <CategoryDropdown
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />
                        </div>
                        <CityDropdown
                            selectedCity={selectedCity}
                            setSelectedCity={setSelectedCity}
                        />
                        <button id="searchBtn" onClick={handleSearch}>
                            <FaSearch /> Finden
                        </button>
                        <button id="newArticleBtn" onClick={handleNewArticle}>
                            <FaPlus /> Anzeige aufgeben
                        </button>
                        <button id="accountBtn" onClick={handleProfileClick}>
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
