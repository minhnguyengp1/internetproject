import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserArticles } from '../../../redux/actions/userActions.js'
import { Card, Typography, Space } from 'antd'
import defaultAvatar from '../../../assets/default-avatar.png'
import UserLayout from '../../../layouts/userLayout/UserLayout.jsx'

const { Meta } = Card

const UserArticles = () => {
    const dispatch = useDispatch()
    const { loading, error, userArticles } = useSelector((state) => state.userArticles)

    useEffect(() => {
        dispatch(fetchUserArticles())
    }, [dispatch])

    if (loading) {
        return <Typography.Text>Loading...</Typography.Text>
    }

    if (error) {
        return <Typography.Text>Error: {error}</Typography.Text>
    }

    return (
        <UserLayout>
            <Space size={20} direction="vertical">
                <Typography.Title level={3}>Your Articles</Typography.Title>
                <Space wrap>
                    {userArticles.map((article) => (
                        <Card
                            key={article.articleId}
                            hoverable
                            style={{ width: 240, marginBottom: 20 }}
                            cover={<img alt={article.title} src={article.imgUrl} />}
                        >
                            <Meta
                                title={article.title}
                                description={`Price: ${article.price}`}
                            />
                        </Card>
                    ))}
                </Space>
            </Space>
        </UserLayout>
    )
}

export default UserArticles
