import './newestArticle.scss'
import { Card, ConfigProvider } from 'antd'
import axios from 'axios'
import { useState, useEffect } from 'react'

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
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: 10,
                },
                components: {
                    Card: {
                        headerBg: '#585458',
                        headerHeight: 50,
                        headerFontSize: 20,
                    },
                },
            }}
        >
            <div className="newestArticle">
                {filteredArticles.map((article, index) => (
                    <Card
                        key={index}
                        className="card"
                        title={article.title}
                        bordered={true}
                        hoverable={true}
                    >
                        <img src={article.imgUrl} alt={article.title} />
                        <p>{article.description}</p>
                        <p>{article.price}</p>
                        <p>{article.category}</p>
                        <p>{article.type}</p>
                    </Card>
                ))}
            </div>
        </ConfigProvider>
    )
}

export default NewestArticle
