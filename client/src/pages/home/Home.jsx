import { useEffect, useState } from 'react'
import './home.scss'
import HomeLayout from '../../layouts/homeLayout/HomeLayout.jsx'
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
                        .filter((article) => !selectedCategory || article.category === selectedCategory) // Filter articles based on selected category
                        .map((article) => (
                            <ArticleCard
                                title={article.title}
                                img={article.imgUrl}
                                id={article.id}
                                category={article.category}
                                description={article.description}
                                price={article.price}
                                postalCode={article.postalCode}
                                city={article.city}
                            />
                        ))
                )}
            </div>
        </HomeLayout>
    )
}

export default Home
