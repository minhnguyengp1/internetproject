import React, { useEffect, useState } from 'react'
import './otherUserView.scss'
import defaultAvatar from '../../assets/default-avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStrangerArticles, fetchStrangerDetails } from '../../redux/actions/userActions.js'
import { useParams } from 'react-router-dom'
import { Button, Card, Form, Space, Typography, Input } from 'antd'
import Header from '../../components/Header/Header.jsx'
import './otherUserView.scss'
import { submitReview } from '../../redux/actions/reviewActions.js'
import ArticleCard from '../../components/ArticleCard/ArticleCard.jsx'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const OtherUserView = () => {
    const { userId } = useParams()
    const [strangerInfo, setStrangerInfo] = useState({
        fullName: '',
        street: '',
        city: '',
        postalCode: '',
        img: null
    })
    const { userId: loggedInUserId } = useSelector((state) => state.userLogin)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [form] = Form.useForm()

    const dispatch = useDispatch()
    const { loading, error, strangerDetails } = useSelector(
        (state) => state.strangerDetails
    )
    const {
        strangerArticles = [],
        loading: articlesLoading,
        error: articlesError
    } = useSelector((state) => state.strangerArticles)
    const { loading: reviewLoading, success: reviewSuccess, error: reviewError } = useSelector(
        (state) => state.reviewSubmit
    )

    useEffect(() => {
        dispatch(fetchStrangerDetails(userId))
        dispatch(fetchStrangerArticles(userId))
    }, [dispatch])

    useEffect(() => {
        if (strangerDetails) {
            setStrangerInfo({
                fullName: strangerDetails.fullName || '',
                street: strangerDetails.street || '',
                city: strangerDetails.city || '',
                postalCode: strangerDetails.postalCode || '',
                img: strangerDetails.img || null
            })
        }
    }, [strangerDetails])

    const handleToggleReviewForm = () => {
        setShowReviewForm(!showReviewForm)
    }

    const handleReviewSubmit = async (values) => {
        await dispatch(submitReview(userId, values))
        setShowReviewForm(false)
        form.resetFields()
    }

    const isCurrentUser = loggedInUserId === userId

    const renderAvatar = (imgUrl) => {
        if (!imgUrl || imgUrl.includes('null')) {
            return defaultAvatar
        }
        return imgUrl
    }

    console.log('strangerInfo', strangerInfo)

    return (
        <div className="profile-container">
            <Header />
            <div className="profile-container__content">
                <div className="profile-sidebar">
                    {strangerInfo && (
                        <div className="user-card">
                            <Typography.Title level={3} className="dashboard-title">User</Typography.Title>
                            <img
                                src={renderAvatar(strangerInfo.img)}
                                alt="Profile"
                                className="user-avatar"
                            />
                            <div className="user-info">
                                <Typography.Text className="user-name">
                                    <strong>Name:</strong> {strangerInfo.fullName}
                                </Typography.Text>
                                <Typography.Text>
                                    <strong>Anzeigen online:</strong>{' '}
                                    {strangerArticles?.length}
                                </Typography.Text>
                                <Typography.Text>
                                    <strong>Aktiv seit:</strong>{' '}
                                    {strangerInfo.activeSince}
                                </Typography.Text>
                                {!isCurrentUser && (
                                    <Button onClick={handleToggleReviewForm}>
                                        Write a Review
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                    {showReviewForm && !isCurrentUser && (
                        <Card className="review-form">
                            <Form form={form} onFinish={handleReviewSubmit}>
                                <Form.Item
                                    name="review"
                                    rules={[{ required: true, message: 'Please enter your review!' }]}
                                >
                                    <Input.TextArea placeholder="Write your review here" rows={4} />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={reviewLoading}
                                        disabled={reviewLoading}
                                    >
                                        Submit Review
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    )}
                </div>
                <div className="profile-articles">
                    <Typography.Title level={3} className="title">Your Articles</Typography.Title>
                    {loading ? (
                        <Typography.Text>Loading...</Typography.Text>
                    ) : error ? (
                        <Typography.Text className="error-text">Error: {error}</Typography.Text>
                    ) : (
                        <>
                            {strangerArticles && strangerArticles.length > 0 ? (
                                strangerArticles.map((article) => (
                                    <div key={article.articleId} className="article-card-wrapper">
                                        <ArticleCard
                                            title={article.title}
                                            img={article.imgUrls.length > 0 ? article.imgUrls[0] : ''}
                                            id={article.articleId}
                                            category={article.category}
                                            description={article.description}
                                            price={article.price}
                                            city={article.city}
                                        />
                                    </div>)
                                )) : (
                                <Typography.Text>No articles found.</Typography.Text>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OtherUserView
