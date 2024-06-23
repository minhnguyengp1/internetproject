import React, { useEffect, useState } from 'react'
import './header.scss'
import AppLogo from '../../assets/logoBlack.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaPlus, FaSearch, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserDetails } from '../../redux/actions/userActions.js'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.jsx'
import { logout } from '../../redux/actions/authActions.js'
import CityDropdown from '../CityDropdown/CityDropdown.jsx'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [query, setQuery] = useState('')

    const { isAuthenticated } = useSelector((state) => state.userLogin)

    const { userDetails } = useSelector((state) => state.userDetails)

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch])

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const initialSelectedCategory = location.pathname.split('/category/')[1] || ''
        const initialSelectedCity = queryParams.get('city') || ''
        const initialQuery = queryParams.get('q') || ''

        setQuery(initialQuery)
        setSelectedCategory(initialSelectedCategory)
        setSelectedCity(initialSelectedCity)
    }, [location])

    const handleLogoutClick = () => {
        dispatch(logout())
        navigate('/')
    }

    const handleSearch = (e) => {
        e.preventDefault()

        const params = new URLSearchParams()

        if (query) params.append('q', query)
        if (selectedCity) params.append('city', selectedCity)

        const categoryPath = selectedCategory ? `/category/${selectedCategory}` : ''
        const queryString = params.toString()

        navigate(`/search${categoryPath}${queryString ? `?${queryString}` : ''}`)
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
                                    <p id="userName">Hallo, {userDetails?.fullName || 'Boss'}</p>
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
