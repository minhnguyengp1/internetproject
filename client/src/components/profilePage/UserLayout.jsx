import SideMenu from './SideMenu.jsx'
import './userLayout.scss'
import PropTypes from 'prop-types'
import Footer from '../Footer.jsx'
import Header from '../Header.jsx'

const UserLayout = ({ children }) => (
    <div className="user-layout">
        <Header />
        <div className="admin-layout__content">
            <SideMenu />
            <div className="admin-layout__main-content">
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