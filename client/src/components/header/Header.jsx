import React, { useEffect, useState } from 'react'
import './headerStyle.scss'
import AppLogo from '../../assets/logoBlack.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserDetails } from '../../redux/actions/userActions.js'
import defaultAvatar from '../../assets/default-avatar.png'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.jsx'
import BundeslandAutocomplete from '../BundeslandAutocomplete/BundeslandAutocomplete.jsx'
import { logout } from '../../redux/actions/authActions.js'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [userInfo, setUserInfo] = useState({
        fullName: ''
    })
    const [selectedCategory, setSelectedCategory] = useState('')
    const [place, setPlace] = useState('')
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
        const placePath = place ? `&place=${place}` : '' // Include place in search URL
        navigate(`/search${categoryPath}${searchPath}${placePath}`)
    }

    const handleProfileClick = () => {
        navigate('/user')
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

            <div className="down">
                {!isLoginOrRegister ? (
                    <form className="buttonsDown">
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

                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*    placeholder="PLZ oder Ort"*/}
                        {/*    value={place}*/}
                        {/*    onChange={(e) => setPlace(e.target.value)} // Handle place input change*/}
                        {/*/>*/}
                        <BundeslandAutocomplete onSelect={(value) => console.log(value)} />
                        <button id="searchBtn" onClick={handleSearch}>
                            <FaSearch /> Finden
                        </button>
                        <button id="accountBtn" onClick={handleProfileClick}>
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
