import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './styles/main.scss';
import React from 'react';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

function App() {
    return (
        <div className="app">
            <div className="container">
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            {/* <Route
                                path="/components"
                                element={<Components />}
                            /> */}
                            {/* <Route path="/templates" element={<Templates />} /> */}
                        </Routes>
                    </Layout>
                </Router>
            </div>
        </div>
    );
}

export default App;
