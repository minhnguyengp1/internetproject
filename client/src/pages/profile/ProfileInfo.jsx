import { Space, Card, Typography, Button, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from '../../redux/actions/userActions'

const ProfileInfo = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        activeArticles: 0,
        activeSince: 'Unknown',
    })

    const dispatch = useDispatch()

    const { error, userDetails } = useSelector((state) => state.userDetails)

    useEffect(() => {
        // Dispatch fetchUserDetails action and update local states
        dispatch(fetchUserDetails()).then(() => {
            if (userDetails) {
                setUserInfo({
                    fullName: userDetails.fullName || '',
                    activeArticles: userDetails.activeArticles || 0,
                    activeSince: userDetails.activeSince || 'Unknown',
                })
            }
        })
    }, [dispatch, userDetails])

    const handleEditName = () => {
        // Implement logic to handle editing name
    }

    const handleEditAddress = () => {
        // Implement logic to handle editing address
    }

    return (
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
    )
}

export default ProfileInfo
