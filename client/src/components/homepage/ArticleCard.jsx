import './articleCard.scss'
const ArticleCard = ({ title, img }) => {
    return (
        <div className="card">
            <div className="card-img">
                <img src={img} alt={title} />
            </div>
            <div className="cardDetails">
                <p>{title}</p>
            </div>
        </div>
    )
}

export default ArticleCard
