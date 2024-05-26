import './articleCard.scss'
import { Link } from 'react-router-dom'

const ArticleCard = ({ title, img, id }) => {
    return (
        <div className="card">
            <Link to={`/article/${id}`}>
                <div className="card-img">
                    <img src={img} alt={title} />
                </div>
                <div className="cardDetails">
                    <p>{title}</p>
                </div>
            </Link>
        </div>
    )
}

export default ArticleCard
