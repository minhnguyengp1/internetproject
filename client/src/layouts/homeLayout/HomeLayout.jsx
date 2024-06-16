import Footer from '../../components/footer/Footer.jsx'
import Header from '../../components/header/Header.jsx'
import CategorySidebar from '../../components/sidebar-menu/CategorySidebar.jsx'
import './homeLayout.scss'

const HomeLayout = ({ children }) => {
    return (
        <div className="home-layout">
            <Header />
            <div className="home-layout__content">
                <CategorySidebar />
                <div className="home-layout__main-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default HomeLayout