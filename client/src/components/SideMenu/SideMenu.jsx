import {
    AppstoreOutlined, HeartOutlined, SettingOutlined,
    ShopOutlined,
    ShoppingCartOutlined, SolutionOutlined, TeamOutlined, UsergroupAddOutlined,
    UserOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './sideMenu.scss'

function SideMenu() {
    const location = useLocation()
    const [selectedKeys, setSelectedKeys] = useState('/')

    useEffect(() => {
        const pathName = location.pathname
        setSelectedKeys(pathName)
    }, [location.pathname])

    const navigate = useNavigate()
    return (
        <Menu
            className="side-menu"
            mode="vertical"
            onClick={(item) => {
                //item.key
                navigate(item.key)
            }}
            selectedKeys={[selectedKeys]}
            items={[
                {
                    label: 'Dashboard',
                    key: '/user',
                    icon: <AppstoreOutlined />
                },
                {
                    label: 'Profilinformationen',
                    key: '/user/personal-info',
                    icon: <UserOutlined />
                },
                {
                    label: 'Anzeigen',
                    key: '/user/articles',
                    icon: <ShopOutlined />
                },
                {
                    label: 'Bewertungen',
                    key: '/user/reviews',
                    icon: <SolutionOutlined />
                },
                {
                    label: 'Watchlist',
                    key: '/user/watchlist',
                    icon: <HeartOutlined />
                },
                {
                    label: 'Follower',
                    key: '/user/follower-list',
                    icon: <TeamOutlined />
                },
                {
                    label: 'Benutzer, denen du folgst',
                    key: '/user/following-list',
                    icon: <UsergroupAddOutlined />
                },
                {
                    label: 'Einstellungen',
                    key: '/user/settings',
                    icon: <SettingOutlined />
                }
            ]}
        ></Menu>
    )
}

export default SideMenu
