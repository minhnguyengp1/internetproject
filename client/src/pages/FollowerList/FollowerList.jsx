import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Space, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { fetchFollowersList, removeFollower } from '../../redux/actions/followerActions.js'
import './followerList.scss'
import UserLayout from '../../layouts/UserLayout/UserLayout.jsx'
import defaultAvatar from '../../assets/default-avatar.png'
import { Link } from 'react-router-dom'

const FollowerList = () => {
    const dispatch = useDispatch()
    const { followers, loading, error } = useSelector((state) => state.followersList)

    useEffect(() => {
        dispatch(fetchFollowersList())
    }, [dispatch])

    const handleRemove = (followerId) => {
        dispatch(removeFollower(followerId))
    }

    const renderAvatar = (imgUrl) => {
        if (!imgUrl || imgUrl.includes('null')) {
            return defaultAvatar
        }
        return imgUrl
    }

    return (
        <UserLayout>
            <div className="follower-list-container">
                <Typography.Title level={3} className="title">Your Followers</Typography.Title>
                {loading ? (
                    <Typography.Text>Loading...</Typography.Text>
                ) : error ? (
                    <Typography.Text className="error-text">Error: {error}</Typography.Text>
                ) : (
                    <>
                        {followers && followers.length > 0 ? (
                            followers.map((follower) => (
                                <div key={follower.userId} className="follower-card-wrapper">
                                    <Link to={`/other-user/${follower.userId}`} className="follower-card">
                                        {}
                                        <img
                                            src={renderAvatar(follower.img)}
                                            alt={follower.fullName}
                                            className="follower-avatar"
                                        />
                                        <div className="follower-info">
                                            <Typography.Text
                                                className="follower-name">{follower.fullName}</Typography.Text>
                                            <Typography.Text className="follower-address">
                                                {follower.city}, {follower.postalCode}, {follower.street}
                                            </Typography.Text>
                                        </div>
                                        <Button
                                            type="danger"
                                            icon={<DeleteOutlined />}
                                            onClick={() => handleRemove(follower.userId)}
                                        />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <Typography.Text>No followers found.</Typography.Text>
                        )}
                    </>
                )}
            </div>
        </UserLayout>
    )
}

export default FollowerList
