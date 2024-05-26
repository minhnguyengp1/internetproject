import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import MainPicture from '../../components/Article/MainPicture'
import ProfilInfo from '../../components/Article/ProfilInfo'
import './article.scss'

const Article = () => {
    const { id } = useParams()
    const [article, setArticle] = useState(null)

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/article/${id}`
                )
                setArticle(response.data)
            } catch (error) {
                console.error('Error fetching article:', error)
            }
        }

        fetchArticle()
    }, [id])

    if (!article) {
        return <div>Loading...</div>
    }

    return (
        <div className="mainPage">
            <h1>{article.title}</h1>
            <div className="test1">
                <MainPicture img={article.imgUrl} />
                <ProfilInfo userId={article.userId} />
            </div>
            <p>{article.description}</p>
            <p>Price: {article.price} €</p>
            <p>Category: {article.category}</p>
        </div>
    )
}

export default Article
