import SideMenu from '../../components/SideMenu/SideMenu.jsx'
import './userLayout.scss'
import PropTypes from 'prop-types'
import Footer from '../../components/Footer/Footer.jsx'
import Header from '../../components/Header/Header.jsx'

const UserLayout = ({ children }) => (
    <div className="user-layout">
        <Header />
        <div className="user-layout__content">
            <SideMenu className="side-menu" />
            <div className="user-layout__main-content">
                {children}
            </div>
        </div>
        <Footer />
    </div>
)

UserLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default UserLayout