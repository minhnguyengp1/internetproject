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

    console.log('Home -> articles: ', articles)

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
                            console.log('Article file: ', article.imgUrls)
                            console.log('Article[0] file: ', article.imgUrls[0])
                            console.log('article.imgUrls.length > 0', article.imgUrls.length > 0)
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
