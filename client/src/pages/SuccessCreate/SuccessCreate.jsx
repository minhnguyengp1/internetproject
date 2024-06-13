import { Link } from 'react-router-dom'
import { Button, Result } from 'antd'
import './successCreate.scss'

const SuccessCreate = () => {
    return (
        <div className="success-create">
            <Result
                status="success"
                title="Geschafft!"
                subTitle="Your article is now online."
                extra={[
                    <Button type="primary" key="homepage">
                        <Link to="/">Go to Homepage</Link>
                    </Button>,
                    <Button key="articles">
                        <Link to="/user/articles">View Your Articles</Link>
                    </Button>
                ]}
            />
        </div>
    )
}

export default SuccessCreate
