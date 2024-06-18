import './articleCard.scss'
import { Link } from 'react-router-dom'

const ArticleCard = ({ title, img, id, category, description, price, postalCode, city }) => {
    console.log('ArticleCard -> title', title)
    console.log('ArticleCard -> img', img)
    console.log('ArticleCard -> id', id)
    console.log('ArticleCard -> category', category)
    console.log('ArticleCard -> price', price)
    console.log('ArticleCard -> postalCode', postalCode)
    console.log('ArticleCard -> city', city)
    console.log('ArticleCard -> year', description)

    return (
        <div className="article-card-container">
            <Link to={`/articles/${id}`} className="card-link">
                <div className="card-img">
                    <img src={img} alt={title} />
                    <div className="card-img-badge">20</div>
                </div>
                <div className="card-details">
                    <p className="card-location">{postalCode}, {city}</p>
                    <p className="card-title">{title}</p>
                    <p className="card-description">{description}</p>
                    <p className="card-price">{price} €</p>
                    <div className="card-info">
                        <span>{} km</span>
                        <span>{}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ArticleCard
