import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Typography, Space } from 'antd'
import UserLayout from '../../../layouts/UserLayout/UserLayout.jsx'
import { fetchUserReviews } from '../../../redux/actions/reviewActions.js'
import defaultAvatar from '../../../assets/default-avatar.png'
import './userReviews.scss'

const { Meta } = Card

const UserReviews = () => {
    const dispatch = useDispatch()
    const { userReviews, loading, error } = useSelector((state) => state.userReviews)

    useEffect(() => {
        dispatch(fetchUserReviews())
    }, [dispatch])

    return (
        <UserLayout>
            <div className="review-list-container">
                <Typography.Title level={3} className="title">Bewertungen von anderen Benutzern</Typography.Title>
                {loading ? (
                    <Typography.Text>Loading...</Typography.Text>
                ) : error ? (
                    <Typography.Text className="error-text">Error: {error}</Typography.Text>
                ) : (
                    <>
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
                                </Card>)
                            )) : (
                            <Typography.Text>No reviews found.</Typography.Text>
                        )}
                    </>
                )}
            </div>
        </UserLayout>
    )
}

export default UserReviews
