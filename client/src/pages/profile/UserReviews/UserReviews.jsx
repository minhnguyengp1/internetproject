import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Typography, Space } from 'antd'
import UserLayout from '../../../layouts/userLayout/UserLayout.jsx'
import { fetchUserReviews } from '../../../redux/actions/reviewActions.js'
import defaultAvatar from '../../../assets/default-avatar.png'

const { Meta } = Card

const UserReviews = () => {
    const dispatch = useDispatch()
    const { userReviews, loading, error } = useSelector((state) => state.userReviews)

    useEffect(() => {
        dispatch(fetchUserReviews())
    }, [dispatch])

    // useEffect(() => {
    //     if (userArticles) {
    //         setArticleList(userArticles)
    //     }
    // }, [userArticles])

    if (loading) {
        return <Typography.Text>Loading...</Typography.Text>
    }

    if (error) {
        return <Typography.Text className="error-text">Error: {error}</Typography.Text>
    }

    return (
        <UserLayout>
            <Space size={20} direction="vertical" className="review-list">
                <Typography.Title level={3} className="title">Bewertungen von anderen Users</Typography.Title>
                <Space wrap>
                    {userReviews && userReviews.length > 0 ? (
                        userReviews.map((review) => (
                            <Card key={review.reviewId} hoverable className="review-card">
                                <Meta
                                    avatar={<img src={review.authorImg || defaultAvatar} alt={review.authorName}
                                                 className="review-avatar" />}
                                    title={review.authorName}
                                    description={
                                        <>
                                            <Typography.Text>Bewertung: {review.rating}/5</Typography.Text>
                                            <br />
                                            <Typography.Text>{review.text}</Typography.Text>
                                        </>
                                    }
                                />
                            </Card>
                        ))
                    ) : (
                        <Typography.Text>No reviews found.</Typography.Text>
                    )}
                </Space>
            </Space>
        </UserLayout>
    )
}

export default UserReviews
