import './newestArticle.scss'
import { Card } from 'antd'
import { items } from '../../assets/articlePhotos'

const NewestArticle = () => {
    return (
        <div className="newestArticle">
            {items.map((item, index) => (
                <Card
                    key={index}
                    className="card"
                    title={item.name}
                    bordered={true}
                    hoverable={true}
                >
                    <img src={item.img} alt={item.name} />
                </Card>
            ))}
        </div>
    )
}

export default NewestArticle
