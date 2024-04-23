import React from 'react';
import "./headerStyle.scss"
import AppLogo from '../assets/app-logo.png'
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Importiere das Lupe-Symbol von react-icons

const Header = () => {
    return(
        <div>
            <div className="top">
                <img className="imageLogo" src={AppLogo} alt=""/>
        
                <form className="buttonsTop">
                    <button className="buttonRegister"> <span><Link to="/register"> Regestrieren </Link></span></button>
                    <span>oder</span>
                    <button className="buttonEinloggen"> <span><Link to="/login">Einloggen</Link></span></button>
                </form>
        
            </div>

            <div className="down">
                <form className="buttonsDown">
                    <input type="text" placeholder="was suchen Sie?" />
                    <input type="text" placeholder="PLZ oder Ort" />
                    <button><FaSearch /> Finden</button> 
                </form>
            </div>

        </div>
       );
};

export default Header;
