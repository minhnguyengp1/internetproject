import { Outlet } from 'react-router-dom'
import SideMenu from './SideMenu.jsx'
import './userLayout.scss'

const UserLayout = () => (
    <div className="SideMenuAndPageContent">
        <SideMenu />
        <div className="PageContent">
            <Outlet /> {/* This is where dynamic content is displayed */}
        </div>
    </div>
)

export default UserLayout
