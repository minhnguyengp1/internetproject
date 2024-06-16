import { Space, Card, Typography, Button, Input } from 'antd'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails, updateUserDetails } from '../../../redux/actions/userActions.js'
import UserLayout from '../../../layouts/userLayout/UserLayout.jsx'
import defaultAvatar from '../../../assets/default-avatar.png'

const ProfileInfo = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        street: '',
        city: '',
        postalCode: '',
        img: defaultAvatar
    })
    const [editMode, setEditMode] = useState({
        name: false,
        address: false
    })
    const dispatch = useDispatch()

    const { error, userDetails } = useSelector((state) => state.userDetails)

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch])

    useEffect(() => {
        if (userDetails) {
            console.log('userDetails: ', userDetails)
            setUserInfo({
                fullName: userDetails.fullName || '',
                street: userDetails.street || '',
                city: userDetails.city || '',
                postalCode: userDetails.postalCode || '',
                img: userDetails.img || null
            })
        }
    }, [userDetails])

    const handleEditToggle = (field) => {
        setEditMode((prevMode) => ({
            ...prevMode,
            [field]: !prevMode[field]
        }))
    }

    const handleSave = (field) => {
        if (field === 'address') {
            const addressFields = {
                street: userInfo.street,
                city: userInfo.city,
                postalCode: userInfo.postalCode
            }

            dispatch(updateUserDetails(addressFields))
                .then(() => {
                    handleEditToggle(field)
                })
                .catch((err) => {
                    console.error('Failed to update user details:', err)
                })
        } else {
            dispatch(updateUserDetails({ [field]: userInfo[field] }))
                .then(() => {
                    handleEditToggle(field)
                })
                .catch((err) => {
                    console.error('Failed to update user details:', err)
                })
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }))
    }

    return (
        <UserLayout>
            <Space size={20} direction="vertical">
                <Typography.Title level={3}>Profilinformationen</Typography.Title>
                <Space wrap>
                    <Card style={{ width: '100%' }}>
                        <Space direction="horizontal" size={16}>
                            <div className="profile-pic">
                                <img src={userInfo.img} alt="Profile" />
                            </div>
                            <Space direction="vertical">
                                <Typography.Text>
                                    <strong>Profilname:</strong>
                                    {editMode.name ? (
                                        <>
                                            <Input
                                                name="fullName"
                                                value={userInfo.fullName}
                                                onChange={handleInputChange}
                                                placeholder="Name"
                                                style={{ width: 'auto', marginLeft: '10px' }}
                                            />
                                            <Button type="link" onClick={() => handleSave('fullName')}>
                                                <SaveOutlined />
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            {userInfo.fullName}
                                            <Button type="link" onClick={() => handleEditToggle('name')}>
                                                <EditOutlined />
                                            </Button>
                                        </>
                                    )}
                                </Typography.Text>
                                <Typography.Text>
                                    <strong>Lieferadresse:</strong>
                                    {editMode.address ? (
                                        <>
                                            <Input
                                                name="street"
                                                value={userInfo.street}
                                                onChange={handleInputChange}
                                                placeholder="Straße"
                                                style={{ width: 'auto', marginLeft: '10px' }}
                                            />
                                            <Input
                                                name="postalCode"
                                                value={userInfo.postalCode}
                                                onChange={handleInputChange}
                                                placeholder="Postleitzahl"
                                                style={{ width: 'auto', marginLeft: '10px' }}
                                            />
                                            <Input
                                                name="city"
                                                value={userInfo.city}
                                                onChange={handleInputChange}
                                                placeholder="Stadt"
                                                style={{ width: 'auto', marginLeft: '10px' }}
                                            />
                                            <Button type="link" onClick={() => handleSave('address')}>
                                                <SaveOutlined />
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            {userInfo.street ? `${userInfo.street}, ` : ''}
                                            {userInfo.postalCode ? `${userInfo.postalCode} ` : ''}
                                            {userInfo.city}
                                            <Button type="link" onClick={() => handleEditToggle('address')}>
                                                <EditOutlined />
                                            </Button>
                                        </>
                                    )}
                                </Typography.Text>
                            </Space>
                        </Space>
                    </Card>
                </Space>
            </Space>
        </UserLayout>
    )
}

export default ProfileInfo
