import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
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
            <div className="mainContainer">
                <div className="imgContainer">
                    <img src={article.imgUrl} alt="test" />
                </div>
                <div className="optionsContainer">
                    <div className="itemInfoBox">
                        <h1>{article.title}</h1>
                        <p>{article.price} €</p>
                    </div>
                    <div className="userInfoBox">
                        <p>User name</p>
                        <p>User info</p>
                    </div>
                    <button>Nachricht schreiben</button>
                    <button>Zur Merkliste hinzufügen</button>
                </div>
            </div>
            <div className="descriptionBox">
                <h3>Beschreibung</h3>
                <p>{article.description}</p>
            </div>
        </div>
    )
}

export default Article
