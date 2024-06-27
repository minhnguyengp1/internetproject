import { Space, Card, Typography, Button, Input, message } from 'antd'
import { EditOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails, updateUserDetails } from '../../../redux/actions/userActions'
import UserLayout from '../../../layouts/UserLayout/UserLayout'
import defaultAvatar from '../../../assets/default-avatar.png'
import './profileInfo.scss'

const ProfileInfo = () => {
    const [editMode, setEditMode] = useState(false)
    const [localUserInfo, setLocalUserInfo] = useState({
        fullName: '',
        street: '',
        city: '',
        postalCode: '',
        img: null
    })
    const dispatch = useDispatch()
    const fileInputRef = useRef(null)

    const { error, userDetails, loading } = useSelector((state) => state.userDetails)

    useEffect(() => {
        if (userDetails) {
            setLocalUserInfo({
                fullName: userDetails.fullName || '',
                street: userDetails.street || '',
                city: userDetails.city || '',
                postalCode: userDetails.postalCode || '',
                img: userDetails.img || null
            })
        }
    }, [userDetails])

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch])

    const handleEditToggle = () => {
        setEditMode((prevMode) => !prevMode)
    }

    const handleSave = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('fullName', localUserInfo.fullName)
        formData.append('street', localUserInfo.street)
        formData.append('city', localUserInfo.city)
        formData.append('postalCode', localUserInfo.postalCode)
        if (localUserInfo.img instanceof File) {
            formData.append('img', localUserInfo.img)
        }

        dispatch(updateUserDetails(formData))
            .then(() => {
                setEditMode(false)
                message.success('Profile updated successfully')
            })
            .catch((err) => {
                message.error('Failed to update profile')
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLocalUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }))
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLocalUserInfo((prevInfo) => ({
                ...prevInfo,
                img: file
            }))
        }
    }

    const openFilePicker = () => {
        fileInputRef.current.click()
    }

    return (
        <UserLayout>
            <div className="profile-info-container">
                <Typography.Title level={3}>Profilinformationen</Typography.Title>
                {loading ? (
                    <Typography.Text>Loading...</Typography.Text>
                ) : error ? (
                    <Typography.Text className="error-text">Error: {error}</Typography.Text>
                ) : (
                    <>
                        <Card style={{ width: '100%' }} className="profile-info-wrapper">
                            <Space direction="horizontal" size={16}>
                                <div className="profile-pic">
                                    {localUserInfo.img instanceof File ? (
                                        <img
                                            src={URL.createObjectURL(localUserInfo.img)}
                                            alt="Profile"
                                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                                        />
                                    ) : (
                                        <img
                                            src={localUserInfo.img || defaultAvatar}
                                            alt="Profile"
                                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                                        />
                                    )}
                                    {editMode ? (
                                        <>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileInputChange}
                                                style={{ display: 'none' }}
                                                ref={fileInputRef}
                                            />
                                            <Button onClick={openFilePicker}>
                                                <UploadOutlined /> Avatar auswählen
                                            </Button>
                                        </>
                                    ) : (
                                        <Button type="link" onClick={handleEditToggle}>
                                            <EditOutlined />
                                        </Button>
                                    )}
                                </div>
                                <Space direction="vertical">
                                    <Typography.Text>
                                        <strong>Name: </strong>
                                        {editMode ? (
                                            <>
                                                <Input
                                                    name="fullName"
                                                    value={localUserInfo.fullName}
                                                    onChange={handleInputChange}
                                                    placeholder="Name"
                                                    style={{ width: 'auto', marginLeft: '55px' }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {localUserInfo.fullName}
                                            </>
                                        )}
                                    </Typography.Text>
                                    <Typography.Text>
                                        <strong>Lieferadresse: </strong>
                                        {editMode ? (
                                            <>
                                                <Input
                                                    name="street"
                                                    value={localUserInfo.street}
                                                    onChange={handleInputChange}
                                                    placeholder="Straße"
                                                    style={{ width: 'auto', marginLeft: '10px' }}
                                                />
                                                <Input
                                                    name="postalCode"
                                                    value={localUserInfo.postalCode}
                                                    onChange={handleInputChange}
                                                    placeholder="Postleitzahl"
                                                    style={{ width: 'auto', marginLeft: '10px' }}
                                                />
                                                <Input
                                                    name="city"
                                                    value={localUserInfo.city}
                                                    onChange={handleInputChange}
                                                    placeholder="Stadt"
                                                    style={{ width: 'auto', marginLeft: '10px' }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {localUserInfo.street ? `${localUserInfo.street}, ` : ''}
                                                {localUserInfo.postalCode ? `${localUserInfo.postalCode} ` : ''}
                                                {localUserInfo.city}
                                            </>
                                        )}
                                    </Typography.Text>
                                </Space>
                            </Space>
                        </Card>
                        {editMode && (
                            <Button type="primary" onClick={handleSave}>
                                <SaveOutlined /> Speichern
                            </Button>
                        )}
                    </>
                )}
            </div>
        </UserLayout>
    )
}

export default ProfileInfo
