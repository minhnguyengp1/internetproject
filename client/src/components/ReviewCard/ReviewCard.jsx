import './reviewCard.scss'
import { Link } from 'react-router-dom'

const ReviewCard = ({ title, id }) => {
    return (
        <div className="review-card">
            <Link to={`/review/${id}`}>
                {/*<div className="card-img">*/}
                {/*    <img src={img} alt={title} />*/}
                {/*</div>*/}
                <div className="card-details">
                    <p>{title}</p>
                </div>
            </Link>
        </div>
    )
}

export default ReviewCard
