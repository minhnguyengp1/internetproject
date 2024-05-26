import './newestArticle.scss'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ArticleCard from './ArticleCard'
import { useSearch } from '../../context/SearchContext'

const NewestArticle = ({ selectedCategory }) => {
    const [articles, setArticles] = useState([])
    const { searchTerm } = useSearch()

    useEffect(() => {
        const fetchArticles = async () => {
            const url = selectedCategory
                ? `http://localhost:5000/api/allArticles/${selectedCategory}`
                : 'http://localhost:5000/api/allArticles/'
            try {
                const response = await axios.get(url)
                setArticles(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchArticles()
    }, [selectedCategory])

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm.trim()) {
                try {
                    const response = await axios.get(
                        `http://localhost:5000/api/search?term=${searchTerm}`
                    )
                    console.log('Search results: ', response.data)
                    setArticles(response.data)
                } catch (err) {
                    console.error('Error fetching search results:', err)
                }
            }
        }
        fetchSearchResults()
    }, [searchTerm])

    return (
        <div className="newestArticle">
            {articles.map((article, index) => (
                <ArticleCard
                    key={index}
                    className="card"
                    title={article.title}
                    img={article.imgUrl}
                    id={article.articleId}
                />
            ))}
        </div>
    )
}

export default NewestArticle
