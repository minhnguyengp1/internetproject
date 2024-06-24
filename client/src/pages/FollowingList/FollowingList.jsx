import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Space, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { fetchFollowingList, unfollowUser } from '../../redux/actions/followerActions.js'
import './followingList.scss'
import UserLayout from '../../layouts/UserLayout/UserLayout.jsx'
import defaultAvatar from '../../assets/default-avatar.png'
import { Link } from 'react-router-dom'

const FollowingList = () => {
    const dispatch = useDispatch()
    const { following, loading, error } = useSelector((state) => state.followingList)

    useEffect(() => {
        dispatch(fetchFollowingList())
    }, [dispatch])

    const handleUnfollow = (followedUserId, e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(unfollowUser(followedUserId))
    }

    const renderAvatar = (imgUrl) => {
        if (!imgUrl || imgUrl.includes('null')) {
            return defaultAvatar
        }
        return imgUrl
    }

    return (
        <UserLayout>
            <div className="following-list-container">
                <Typography.Title level={3} className="title">Benutzer, denen du folgst</Typography.Title>
                {loading ? (
                    <Typography.Text>Loading...</Typography.Text>
                ) : error ? (
                    <Typography.Text className="error-text">Error: {error}</Typography.Text>
                ) : (
                    <>
                        {following && following.length > 0 ? (
                            following.map((followedUser) => (
                                <div key={followedUser.userId} className="following-card-wrapper">
                                    <Link to={`/other-user/${followedUser.userId}`} className="following-card">
                                        <img
                                            src={renderAvatar(followedUser.img)}
                                            alt={followedUser.fullName}
                                            className="following-avatar"
                                        />
                                        <div className="following-info">
                                            <Typography.Text
                                                className="following-name">{followedUser.fullName}</Typography.Text>
                                            <Typography.Text className="following-address">
                                                {followedUser.city}, {followedUser.postalCode}, {followedUser.street}
                                            </Typography.Text>
                                        </div>
                                        <Button
                                            type="danger"
                                            icon={<DeleteOutlined />}
                                            onClick={(e) => handleUnfollow(followedUser.userId, e)}
                                        />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <Typography.Text>Es sind keine Benutzer gefolgt.</Typography.Text>
                        )}
                    </>
                )}
            </div>
        </UserLayout>
    )
}

export default FollowingList
