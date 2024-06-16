import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
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
                    icon: <ShopOutlined />
                },
                {
                    label: 'Anzeigen',
                    key: '/user/articles',
                    icon: <ShopOutlined />
                },
                {
                    label: 'Bewertungen',
                    key: '/user/reviews',
                    icon: <UserOutlined />
                },
                {
                    label: 'Einstellungen',
                    key: '/user/settings',
                    icon: <ShoppingCartOutlined />
                }
            ]}
        ></Menu>
    )
}

export default SideMenu
