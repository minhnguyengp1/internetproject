import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserArticles } from '../../../redux/actions/userActions.js'
import { Typography, Space, Button } from 'antd'
import UserLayout from '../../../layouts/UserLayout/UserLayout.jsx'
import { deleteArticle } from '../../../redux/actions/articleActions.js'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import ArticleCard from '../../../components/ArticleCard/ArticleCard.jsx'
import './articleList.scss'
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal.jsx'
import { useNavigate } from 'react-router-dom'

const ArticleList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedArticleId, setSelectedArticleId] = useState(null)

    const { userArticles, loading, error } = useSelector((state) => state.userArticles)

    useEffect(() => {
        dispatch(fetchUserArticles())
    }, [dispatch])

    const handleEdit = (articleId) => {
        navigate(`/update-article/${articleId}`)
    }

    const handleDelete = (articleId) => {
        setSelectedArticleId(articleId)
        setIsModalOpen(true)
    }

    const confirmDelete = () => {
        dispatch(deleteArticle(selectedArticleId))
        setIsModalOpen(false)
        dispatch(fetchUserArticles())
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <UserLayout>
            <div className="articlelist-container">
                <Typography.Title level={3} className="title">Your Articles</Typography.Title>
                {loading ? (
                    <Typography.Text>Loading...</Typography.Text>
                ) : error ? (
                    <Typography.Text className="error-text">Error: {error}</Typography.Text>
                ) : (
                    <>
                        {userArticles && userArticles.length > 0 ? (
                            userArticles.map((article) => (
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
                                    <Space direction="horizontal" style={{ marginTop: 10 }}>
                                        <Button
                                            type="primary"
                                            icon={<EditOutlined />}
                                            onClick={() => handleEdit(article.articleId)}
                                        >
                                            Bearbeiten
                                        </Button>
                                        <Button
                                            type="danger"
                                            icon={<DeleteOutlined />}
                                            onClick={() => handleDelete(article.articleId)}
                                        >
                                            Löschen
                                        </Button>
                                    </Space>
                                </div>)
                            )) : (
                            <Typography.Text>No articles found.</Typography.Text>
                        )}
                    </>
                )}
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={confirmDelete}
                    title="Article Deletion Confirmation"
                    content="Are you sure you want to delete this article?"
                />
            </div>
        </UserLayout>
    )
}

export default ArticleList
