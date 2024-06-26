import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Typography} from 'antd'
import UserLayout from '../../../layouts/UserLayout/UserLayout.jsx'
import {fetchUserReviews} from '../../../redux/actions/reviewActions.js'
import defaultAvatar from '../../../assets/default-avatar.png'
import './userReviews.scss'
import {Link} from 'react-router-dom'

const UserReviews = () => {
    const dispatch = useDispatch()
    const {userReviews, loading, error} = useSelector((state) => state.userReviews)

    console.log('UserReviews: userReviews', userReviews)

    useEffect(() => {
        dispatch(fetchUserReviews())
    }, [dispatch])

    const renderAvatar = (imgUrl) => {
        if (!imgUrl || imgUrl.includes('null')) {
            return defaultAvatar
        }
        return imgUrl
    }

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
                                <div key={review.reviewId} className="review-card-wrapper">
                                    <Link className="review-card">
                                        <img
                                            src={renderAvatar(review.authorImg)}
                                            alt={review.authorName}
                                            className="review-avatar"
                                        />
                                        <div className="review-info">
                                            <Typography.Text className="review-name">
                                                {review.authorName}
                                            </Typography.Text>
                                            <Typography.Text className="review-text">
                                                {review.text}
                                            </Typography.Text>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <Typography.Text>No reviews found.</Typography.Text>
                        )}
                    </>
                )}
            </div>
        </UserLayout>
    )
}

export default UserReviews

