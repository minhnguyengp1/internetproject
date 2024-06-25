import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header/Header.jsx'
import { useParams } from 'react-router-dom'
import { fetchArticleById } from '../../redux/actions/articleActions.js'
import './articleDetails.scss'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import {
    addToWatchlist,
    fetchUserWatchlist,
    removeFromWatchlist,
} from '../../redux/actions/watchlistActions.js'

const ArticleDetails = () => {
    const dispatch = useDispatch()

    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isInWatchlist, setIsInWatchlist] = useState(false)
    const { articleId } = useParams()
    const { article, loading, error } = useSelector(
        (state) => state.articleDetails
    )
    const { watchlist } = useSelector((state) => state.fetchUserWatchlist)

    useEffect(() => {
        dispatch(fetchArticleById(articleId))
    }, [dispatch, articleId])

    useEffect(() => {
        // Check if articleId exists in the user's watchlist
        console.log('watchlist: ', watchlist)
        console.log('articleId: ', articleId)
        console.log(
            'watchlist.some(item => item.articleId === articleId): ',
            watchlist.some((item) => item.articleId === parseInt(articleId))
        )
        setIsInWatchlist(
            watchlist.some((item) => item.articleId === parseInt(articleId))
        )
    }, [watchlist, articleId])

    const handleSendMessage = () => {
        console.log('Sending message to article owner')
    }

    const handleToggleWatchlist = () => {
        if (isInWatchlist) {
            dispatch(removeFromWatchlist(articleId))
        } else {
            dispatch(addToWatchlist(articleId))
        }
        dispatch(fetchUserWatchlist())
    }

    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1)
        }
    }

    const handleNextImage = () => {
        if (currentImageIndex < article.imgUrls.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1)
        }
    }
    return (
        <div className="article-details-layout">
            <Header />
            <div className="article-details-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="article-details">
                        <div className="article-details-left">
                            {article.imgUrls && article.imgUrls.length > 0 && (
                                <div className="image-gallery">
                                    <img
                                        src={article.imgUrls[currentImageIndex]}
                                        alt={article.title}
                                        className="article-image"
                                    />
                                    {article.imgUrls.length > 1 && (
                                        <React.Fragment>
                                            <button
                                                data-testid="prevBtn"
                                                className="prev-button"
                                                onClick={handlePrevImage}
                                                disabled={
                                                    currentImageIndex === 0
                                                }
                                            >
                                                <FaChevronLeft />
                                            </button>
                                            <button
                                                data-testid="nextBtn"
                                                className="next-button"
                                                onClick={handleNextImage}
                                                disabled={
                                                    currentImageIndex ===
                                                    article.imgUrls.length - 1
                                                }
                                            >
                                                <FaChevronRight />
                                            </button>
                                        </React.Fragment>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="article-details-right">
                            <div className="article-details-actions">
                                <button
                                    className="action-button"
                                    onClick={handleSendMessage}
                                >
                                    Nachricht schreiben
                                </button>
                                <button
                                    className="action-button"
                                    onClick={handleToggleWatchlist}
                                >
                                    {isInWatchlist
                                        ? 'Von Merkliste entfernen'
                                        : 'Zur Merkliste hinzufügen'}
                                </button>
                            </div>
                            <div className="article-owner-details">
                                {/* Container for article owner's details */}
                            </div>
                        </div>
                        <div className="article-details-bottom">
                            <h2>{article.title}</h2>
                            <p className="article-price">
                                {article.price} € {article.type}
                            </p>
                            <p className="article-city">{article.city}</p>
                            <p className="article-description">
                                {article.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ArticleDetails
