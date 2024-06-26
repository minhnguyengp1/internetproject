import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header/Header.jsx'
import { Link, useParams } from 'react-router-dom'
import { fetchArticleById } from '../../redux/actions/articleActions.js'
import './articleDetails.scss'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import {
    addToWatchlist,
    fetchUserWatchlist,
    removeFromWatchlist
} from '../../redux/actions/watchlistActions.js'
import { fetchStrangerDetails } from '../../redux/actions/userActions.js'
import { cities } from '../../assets/cities.js'

const ArticleDetails = () => {
    const dispatch = useDispatch()

    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isInWatchlist, setIsInWatchlist] = useState(false)
    const { articleId } = useParams()
    const { article, loading, error } = useSelector(
        (state) => state.articleDetails
    )
    const { watchlist } = useSelector((state) => state.fetchUserWatchlist)
    const { strangerDetails } = useSelector((state) => state.strangerDetails)

    useEffect(() => {
        dispatch(fetchArticleById(articleId))
    }, [dispatch, articleId])

    useEffect(() => {
        setIsInWatchlist(
            watchlist.some((item) => item.articleId === parseInt(articleId))
        )
    }, [watchlist, articleId])

    useEffect(() => {
        if (article && article.userId) {
            dispatch(fetchStrangerDetails(article.userId))
        }
    }, [article])

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

    const getCityNameFromKey = (key) => {
        const city = cities.find(city => city.key === key)
        return city ? city.name : key
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
                                {strangerDetails ? (
                                    <Link to={`/other-user/${strangerDetails.userId}`} className="owner-link">
                                        <div className="owner-details-content">
                                            <img
                                                src={strangerDetails.img}
                                                alt={strangerDetails.fullName}
                                                className="owner-image"
                                            />
                                            <div className="owner-info">
                                                <p className="owner-name">{strangerDetails.fullName}</p>
                                                <p className="owner-city">{getCityNameFromKey(strangerDetails.city)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <p>Loading user details...</p>
                                )}
                            </div>
                        </div>
                        <div className="article-details-bottom">
                            <p className="article-city">{getCityNameFromKey(article.city)}</p>
                            <h2>{article.title}</h2>
                            <p className="article-price">
                                {article.price} € {article.type}
                            </p>
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
