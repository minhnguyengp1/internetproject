import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {removeFromWatchlist, fetchUserWatchlist} from '../../redux/actions/watchlistActions.js'
import ArticleCard from '../../components/ArticleCard/ArticleCard.jsx'
import './watchlist.scss'
import {Button, Space, Typography} from 'antd'
import UserLayout from '../../layouts/UserLayout/UserLayout.jsx'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'

const Watchlist = () => {
    const dispatch = useDispatch()
    const {watchlist, loading, error} = useSelector((state) => state.fetchUserWatchlist)

    useEffect(() => {
        dispatch(fetchUserWatchlist())
    }, [dispatch])

    const handleRemoveFromWatchlist = (articleId) => {
        dispatch(removeFromWatchlist(articleId))
        dispatch(fetchUserWatchlist())
    }

    console.log('watchlist: ', watchlist)

    return (
        <UserLayout>
            <div className="watchlist-container">
                <Typography.Title level={3} className="title">Watchlist</Typography.Title>
                {loading ? (
                    <Typography.Text>Loading...</Typography.Text>
                ) : error ? (
                    <Typography.Text className="error-text">Error: {error}</Typography.Text>
                ) : (
                    <>
                        {watchlist && watchlist.length > 0 ? (
                            watchlist.map((article) => (
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
                                    <Space direction="horizontal" style={{marginTop: 10}}>
                                        <Button
                                            className="remove-button"
                                            icon={<DeleteOutlined/>}
                                            onClick={() => handleRemoveFromWatchlist(article.articleId)}
                                        >
                                            Entfernen
                                        </Button>
                                    </Space>
                                </div>)
                            )) : (
                            <Typography.Text>No articles found in your watchlist.</Typography.Text>
                        )}
                    </>
                )}
            </div>
        </UserLayout>
    )
}

export default Watchlist