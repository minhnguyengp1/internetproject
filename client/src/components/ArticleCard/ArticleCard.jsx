import './articleCard.scss'
import { Link } from 'react-router-dom'
import { categories } from '../../assets/categories.js'
import { cities } from '../../assets/cities.js'

const ArticleCard = ({ title, img, id, category, description, price, city }) => {
    const categoryLabel = categories.find(cat => cat.key === category)?.label || 'Unknown Category'

    const getCityNameFromKey = (key) => {
        const city = cities.find(city => city.key === key)
        return city ? city.name : key
    }

    return (
        <div className="article-card-container">
            <Link to={`/article/${id}`} className="card-link">
                <div className="card-img">
                    <img src={img} alt={title} />
                    <div className="card-img-badge">20</div>
                </div>
                <div className="card-details">
                    <p className="card-city">{getCityNameFromKey(city)}</p>
                    <p className="card-title">{title}</p>
                    <p className="card-description">{description}</p>
                    <p className="card-price">{price} €</p>
                    <p className="card-category">Kategorie: {categoryLabel}</p>
                    <div className="card-info">
                        <span>{}</span>
                        <span>{}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ArticleCard
