import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Space, Button } from 'antd'
import UserLayout from '../../../layouts/UserLayout/UserLayout.jsx'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './articleList.scss'
import { fetchFollowersList } from '../../redux/actions/followerActions.js'

const FollowingList = () => {
    const dispatch = useDispatch()
    const { followers, loading, error } = useSelector((state) => state.followersList)

    console.log('followers: ', followers)

    useEffect(() => {
        dispatch(fetchFollowersList())
    }, [dispatch])

    const handleEdit = (articleId) => {
        console.log('Edit article:', articleId)
    }

    const handleDelete = (articleId) => {
        dispatch(deleteArticle(articleId))
    }

    return (
        <UserLayout>
            <div className="article-list-container">
                <Typography.Title level={3} className="title">Your Articles</Typography.Title>
                {loading ? (
                    <Typography.Text>Loading...</Typography.Text>
                ) : error ? (
                    <Typography.Text className="error-text">Error: {error}</Typography.Text>
                ) : (
                    <>
                        {followers && followers.length > 0 ? (
                            followers.map((follower) => (
                                <div key={article.articleId} className="article-card-wrapper">

                                    <Space direction="horizontal" style={{ marginTop: 10 }}>
                                        <Button
                                            type="primary"
                                            icon={<EditOutlined />}
                                            onClick={() => handleEdit()}
                                        >
                                            Bearbeiten
                                        </Button>
                                        <Button
                                            type="danger"
                                            icon={<DeleteOutlined />}
                                            onClick={() => handleDelete()}
                                        >
                                            Löschen
                                        </Button>
                                    </Space>
                                </div>)
                            )) : (
                            <Typography.Text>No follower found.</Typography.Text>
                        )}
                    </>
                )}
            </div>
        </UserLayout>
    )
}

export default FollowingList
