import { Card, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import './dashboard.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails } from '../../../redux/actions/userActions.js'
import defaultAvatar from '../../../assets/default-avatar.png'
import UserLayout from '../../../layouts/UserLayout/UserLayout.jsx'

const Dashboard = () => {
    const dispatch = useDispatch()
    const { userDetails, loading, error } = useSelector((state) => state.userDetails)

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch])

    return (
        <UserLayout>
            <div className="dashboard-container">
                <Typography.Title level={3} className="title">Dashboard</Typography.Title>
                {loading ? (
                    <Typography.Text>Loading...</Typography.Text>
                ) : error ? (
                    <Typography.Text className="error-text">Error: {error}</Typography.Text>
                ) : (
                    <>
                        {userDetails && (
                            <Card className="user-card">
                                <Space direction="horizontal" size={16}>
                                    <img
                                        src={userDetails?.img || defaultAvatar}
                                        alt="Profile"
                                        className="profile-pic"
                                    />
                                    <Space direction="vertical">
                                        <Typography.Text>
                                            <strong>Name:</strong> {userDetails.fullName}
                                        </Typography.Text>
                                        <Typography.Text>
                                            <strong>Anzeigen online:</strong>{' '}
                                            {}
                                        </Typography.Text>
                                        <Typography.Text>
                                            <strong>Aktiv seit:</strong>{' '}
                                            {}
                                        </Typography.Text>
                                    </Space>
                                </Space>
                            </Card>
                        )}
                    </>
                )}
            </div>
        </UserLayout>
    )
}

export default Dashboard
