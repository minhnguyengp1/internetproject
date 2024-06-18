import React, { useEffect, useState } from 'react'
import './otherUserView.scss'
import defaultAvatar from '../../assets/default-avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStrangerArticles, fetchStrangerDetails } from '../../redux/actions/userActions.js'
import { useParams } from 'react-router-dom'
import { Button, Card, Form, Space, Typography, Input } from 'antd'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import './otherUserView.scss'
import { submitReview } from '../../redux/actions/reviewActions.js'

const OtherUserView = () => {
    const { userId } = useParams()
    const [strangerInfo, setStrangerInfo] = useState({
        fullName: '',
        activeArticles: 0,
        activeSince: 'Unknown',
        street: '',
        city: '',
        postalCode: '',
        img: defaultAvatar
    })
    const { userId: loggedInUserId } = useSelector((state) => state.userLogin) // Get current user's userId
    const [showReviewForm, setShowReviewForm] = useState(false) // State to manage review form visibility
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
            console.log('strangerDetails: ', strangerDetails)
            setStrangerInfo({
                fullName: strangerDetails.fullName || '',
                street: strangerDetails.street || '',
                city: strangerDetails.city || '',
                postalCode: strangerDetails.postalCode || '',
                img: strangerDetails.img || null
            })
        }
    }, [strangerDetails])

    console.log('strangerDetails in OtherUserView: ' + JSON.stringify(strangerDetails))
    console.log('strangerArticles in OtherUserView: ' + JSON.stringify(strangerArticles))

    const handleToggleReviewForm = () => {
        setShowReviewForm(!showReviewForm) // Toggle review form visibility
    }

    const handleReviewSubmit = async (values) => {
        await dispatch(submitReview(userId, values))
        setShowReviewForm(false) // Hide the review form after submission
        form.resetFields() // Reset form fields
    }

    const isCurrentUser = loggedInUserId === userId // Check if the current user is viewing their own profile

    if (loading) {
        return <Typography.Text>Loading...</Typography.Text>
    }

    if (error) {
        return <Typography.Text>Error: {error}</Typography.Text>
    }

    return (
        <div className="profile-container">
            <Header />
            <div className="profile-container__content">
                <div className="profile-sidebar">
                    {strangerInfo && (
                        <Card className="user-card">
                            <Typography.Title level={4} className="dashboard-title">Dashboard</Typography.Title>
                            <img
                                src={strangerInfo.img}
                                alt="Profile"
                                className="profile-pic" // Global styles
                            />
                            <Space direction="vertical">
                                <Typography.Text>
                                    <strong>Name:</strong> {strangerInfo.fullName}
                                </Typography.Text>
                                <Typography.Text>
                                    <strong>Anzeigen online:</strong>{' '}
                                    {strangerInfo.activeArticles}
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
                            </Space>
                        </Card>
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
                    <h2>Articles</h2>
                    <ul className="articles-list">
                        {strangerArticles.map(article => (
                            <li key={article.articleId} className="article-item">
                                <img src={article.image} alt={article.title} className="article-image" />
                                <div className="article-details">
                                    <h3>{article.title}</h3>
                                    <p>{article.description}</p>
                                    <p className="article-price">{article.price} €</p>
                                    <p className="article-location">{article.location}</p>
                                    <p className="article-date">{article.date}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OtherUserView
