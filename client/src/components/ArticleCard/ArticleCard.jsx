import './articleCard.scss'
import { Link } from 'react-router-dom'

const ArticleCard = ({ title, img, id, category, price, location, year, mileage }) => {
    console.log('ArticleCard -> title', title)
    console.log('ArticleCard -> img', img)
    console.log('ArticleCard -> id', id)
    console.log('ArticleCard -> category', category)
    console.log('ArticleCard -> price', price)
    console.log('ArticleCard -> location', location)
    console.log('ArticleCard -> year', year)
    console.log('ArticleCard -> mileage', mileage)

    return (
        <div className="card">
            <Link to={`/articles/${id}`} className="card-link">
                <div className="card-img">
                    <img src={img} alt={title} />
                    <div className="card-img-badge">20</div>
                </div>
                <div className="card-details">
                    <p className="card-location">{location}</p>
                    <p className="card-title">{title}</p>
                    <p className="card-description">Zu verkaufen BMW GT 550 i mit fast... </p>
                    <p className="card-price">{price} €</p>
                    <div className="card-info">
                        <span>{mileage} km</span>
                        <span>{year}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ArticleCard
