import React from 'react'
import './headerStyle.scss'
import AppLogo from '../assets/logoBlack.png'
import { Link } from 'react-router-dom'
import { FaSearch, FaUser } from 'react-icons/fa'

const Header = () => {
    return (
        <div className="header">
            <div className="top">
                <Link id="homeLink" to={'/'}>
                    <img className="imageLogo" src={AppLogo} alt="yabe" />
                </Link>
                <form className="buttonsTop">
                    <button className="buttonRegister">
                        <span>
                            <Link to="/register">Registrieren </Link>
                        </span>
                    </button>
                    <span>oder</span>
                    <button className="buttonEinloggen">
                        <span>
                            <Link to="/login">Einloggen</Link>
                        </span>
                    </button>
                </form>
            </div>

            <div className="down">
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
            </div>
        </div>
    )
}

export default Header
