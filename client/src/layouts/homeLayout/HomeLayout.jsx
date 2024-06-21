import Footer from '../../components/Footer/Footer.jsx'
import Header from '../../components/Header/Header.jsx'
import CategorySidebar from '../../components/CategorySidebar/CategorySidebar.jsx'
import './homeLayout.scss'

const HomeLayout = ({ children }) => {
    return (
        <div className="home-layout">
            <Header />
            <div className="home-layout__content">
                <CategorySidebar />
                <div className="home-layout__main-content">{children}</div>
            </div>
        </div>
    )
}

export default HomeLayout
