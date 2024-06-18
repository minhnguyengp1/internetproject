import './articleCard.scss'
import { Link } from 'react-router-dom'

const ArticleCard = ({ title, img, id, category, description, price, postalCode, city }) => {
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
