import './newestArticle.scss'
import { Card, Col, Row } from 'antd'

import bike1 from '../../assets/articlePhotos/bike1.jpg'
import bike2 from '../../assets/articlePhotos/bike2.jpg'
import bike3 from '../../assets/articlePhotos/bike3.jpg'
import bike4 from '../../assets/articlePhotos/bike4.jpg'
import bike5 from '../../assets/articlePhotos/bike5.jpg'
import bike6 from '../../assets/articlePhotos/bike6.jpg'

const NewestArticle = () => {
    return (
        <Row gutter={16}>
            <Col span={8}>
                <Card className="card" title="Artikel 1" bordered={false}>
                    <img src={bike1} alt="bike1" />
                </Card>
            </Col>
            <Col span={8}>
                <Card className="card" title="Artikel 2" bordered={false}>
                    <img src={bike2} alt="bike2" />
                </Card>
            </Col>
            <Col span={8}>
                <Card className="card" title="Artikel 3" bordered={false}>
                    <img src={bike3} alt="bike3" />
                </Card>
            </Col>
        </Row>
    )
}

export default NewestArticle
