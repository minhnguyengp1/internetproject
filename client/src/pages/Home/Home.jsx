import { useEffect, useState } from 'react'
import './home.scss'
import HomeLayout from '../../layouts/HomeLayout/HomeLayout.jsx'
import ArticleCard from '../../components/ArticleCard/ArticleCard.jsx'
import { fetchArticles } from '../../redux/actions/articleActions.js'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
    const dispatch = useDispatch()
    const { loading, articles, error, selectedCategory } = useSelector((state) => state.articleList)

    useEffect(() => {
        dispatch(fetchArticles())
    }, [dispatch])

    return (
        <HomeLayout>
            <div className="article-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    articles
                        .filter((article) => !selectedCategory || article.category === selectedCategory)
                        .map((article) => {
                            return (
                                <ArticleCard
                                    key={article.articleId}
                                    title={article.title}
                                    img={article.imgUrls.length > 0 ? article.imgUrls[0] : ''}
                                    id={article.articleId}
                                    category={article.category}
                                    description={article.description}
                                    price={article.price}
                                    postalCode={article.postalCode}
                                    city={article.city}
                                />
                            )
                        })
                )}
            </div>
        </HomeLayout>
    )
}

export default Home
