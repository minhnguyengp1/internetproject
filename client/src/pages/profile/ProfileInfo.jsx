import { Space, Card, Typography, Button, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from '../../redux/actions/userActions'
import UserLayout from '../../components/profilePage/UserLayout.jsx'

const ProfileInfo = () => {
    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        activeArticles: 0,
        activeSince: 'Unknown',
        articles: []
    })

    const { error, userDetails } = useSelector((state) => state.userDetails)

    useEffect(() => {
        dispatch(fetchUserDetails()).then(() => {
            if (userDetails) {
                setUserInfo({
                    fullName: userDetails.fullName || '',
                    activeArticles: userDetails.activeArticles || 0,
                    activeSince: userDetails.activeSince || 'Unknown'
                })
            }
        })
    }, [dispatch, userDetails])

    const handleEditName = () => {
    }

    const handleEditAddress = () => {
    }

    return (
        <UserLayout>
            <Space size={20} direction="vertical">
                <Typography.Title level={4}>Profilinformationen</Typography.Title>
                <Card style={{ width: '100%' }}>
                    <Space direction="horizontal" size={16}>
                        <div className="profile-pic">
                            <img src={userInfo.img} alt="Profile" />
                        </div>
                        <Space direction="vertical">
                            <Typography.Text>
                                <strong>Profilname:</strong> {userInfo.fullName}
                                <Button type="link" onClick={handleEditName}>
                                    <EditOutlined />
                                </Button>
                            </Typography.Text>
                            <Typography.Text>
                                <strong>Lieferadresse:</strong> {userInfo.address}
                                <Button type="link" onClick={handleEditAddress}>
                                    <EditOutlined />
                                </Button>
                            </Typography.Text>
                        </Space>
                    </Space>
                </Card>
            </Space>
        </UserLayout>
    )
}

export default ProfileInfo
