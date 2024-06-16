import './newestArticle.scss'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ArticleCard from '../../components/ArticleCard/ArticleCard.jsx'

const NewestArticle = ({ selectedCategory }) => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/allArticles/'
                )
                setArticles(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchArticles()
    }, [])

    const filteredArticles = selectedCategory
        ? articles.filter((article) => article.category === selectedCategory)
        : articles

    return (
        <div className="newestArticle">
            {filteredArticles.map((article, index) => (
                <ArticleCard
                    key={index}
                    className="card"
                    title={article.title}
                    img={article.imgUrl}
                />
            ))}
        </div>
    )
}

export default NewestArticle
