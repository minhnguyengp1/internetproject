// ReviewCard.jsx
import './reviewCard.scss'
import { Link } from 'react-router-dom'

const ReviewCard = ({ id, author, text, rating }) => {
    return (
        <div className="review-card">
            <Link to={`/review/${id}`}>
                <div className="card-details">
                    <p className="author">{author}</p>
                    <p className="text">{text}</p>
                    <div className={`rating ${rating.toLowerCase()}`}>
                        {rating}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ReviewCard
