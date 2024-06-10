import SideMenu from '../../components/profilePage/SideMenu.jsx'
import './homeLayout.scss'
import PropTypes from 'prop-types'
import Footer from '../../components/footer/Footer.jsx'
import Header from '../../components/header/Header.jsx'
import SidebarMenu from '../../components/sidebar-menu/SidebarMenu.jsx'

const HomeLayout = ({ children }) => (
    <div className="home-layout">
        <Header />
        <div className="home-layout__content">
            <SidebarMenu className="sidebar-menu" />
            <div className="home-layout__main-content">
                {children}
            </div>
        </div>
        <Footer />
    </div>
)

HomeLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default HomeLayout