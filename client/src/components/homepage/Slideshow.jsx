import { useState } from 'react'
import './slideshow.scss'

const Slideshow = () => {
    const articles = [
        {
            id: 1,
            title: 'Fahrrad 1',
            image: require('../../assets/articlePhotos/bike1.jpg'),
        },
        {
            id: 2,
            title: 'Fahrrad 2',
            image: require('../../assets/articlePhotos/bike2.jpg'),
        },
        {
            id: 3,
            title: 'Fahrrad 3',
            image: require('../../assets/articlePhotos/bike3.jpg'),
        },
        {
            id: 4,
            title: 'Fahrrad 4',
            image: require('../../assets/articlePhotos/bike4.jpg'),
        },
        {
            id: 5,
            title: 'Fahrrad 5',
            image: require('../../assets/articlePhotos/bike5.jpg'),
        },
        {
            id: 6,
            title: 'Fahrrad 6',
            image: require('../../assets/articlePhotos/bike6.jpg'),
        },
    ]

    const groupedArticles = []
    for (let i = 0; i < articles.length; i += 3) {
        groupedArticles.push(articles.slice(i, i + 3))
    }

    const [current, setCurrent] = useState(0)

    const nextSlide = () => {
        setCurrent(current === groupedArticles.length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? groupedArticles.length - 1 : current - 1)
    }

    return (
        <div className="slideshow">
            <button onClick={prevSlide}>&lt;</button>
            <div className="slides">
                {groupedArticles[current].map((article) => (
                    <div className="slide" key={article.id}>
                        <img src={article.image} alt={article.title} />
                    </div>
                ))}
            </div>
            <button onClick={nextSlide}>&gt;</button>
        </div>
    )
}

export default Slideshow
