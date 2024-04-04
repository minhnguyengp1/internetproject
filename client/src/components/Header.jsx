import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <h1>Ebay 2.0</h1>
                    </Link>
                </div>
                <div className="links">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search..."
                    />
                    <img
                        className="small-screen-logo"
                        src="/path/to/small-screen-logo.png"
                        alt="Logo for small screens"
                    />
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/path/to/github-logo.png"
                            alt="change me later"
                        />
                    </a>
                    <a
                        href="https://instagram.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/path/to/instagram-logo.png"
                            alt="change me later"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;
