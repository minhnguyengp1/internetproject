import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserArticles } from '../../../redux/actions/userActions.js'
import { Card, Typography, Space, Button } from 'antd'
import UserLayout from '../../../layouts/userLayout/UserLayout.jsx'
import { deleteArticle } from '../../../redux/actions/articleActions.js'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Meta } = Card

const ArticleList = ({ userId }) => {
    const [articleList, setArticleList] = useState([])

    const dispatch = useDispatch()
    const {
        userArticles,
        loading,
        error
    } = useSelector((state) => state.userArticles)

    useEffect(() => {
        dispatch(fetchUserArticles())
    }, [dispatch])

    useEffect(() => {
        if (userArticles) {
            setArticleList(userArticles)
        }
    }, [userArticles])

    const handleEdit = (articleId) => {
        // Navigate to edit page or open edit modal
        console.log('Edit article:', articleId)
        // You can implement navigation to edit page here
    }

    const handleDelete = (articleId) => {
        dispatch(deleteArticle(articleId))
            .then(() => {
                // toast.success('Article deleted successfully')
                setArticleList((prevList) => prevList.filter((article) => article.articleId !== articleId))
            })
            .catch((err) => {
                // message.error('Failed to delete article')
                console.error('Failed to delete article:', err)
            })
    }

    if (loading) {
        return <Typography.Text>Loading...</Typography.Text>
    }

    if (error) {
        return <Typography.Text className="error-text">Error: {error}</Typography.Text>
    }

    return (
        <UserLayout>
            <Space size={20} direction="vertical" className="article-list">
                <Typography.Title level={3} className="title">Your Articles</Typography.Title>
                <Space wrap>
                    {articleList.map((article) => (
                        <Card
                            key={article.articleId}
                            hoverable
                            className="article-card"
                            cover={<img alt={article.title} src={article.imgUrl} />}
                        >
                            <Meta
                                title={article.title}
                                description={
                                    <>
                                        <Typography.Text>Category: {article.category}</Typography.Text><br />
                                        <Typography.Text>Price: {article.price}</Typography.Text>
                                    </>
                                }
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
                        </Card>
                    ))}
                </Space>
            </Space>
        </UserLayout>
    )
}

export default ArticleList
