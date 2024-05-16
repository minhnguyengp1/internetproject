import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserArticles } from '../../redux/actions/userActions'
import { Card, Typography, Space } from 'antd'

const { Meta } = Card

const UserArticles = ({ userId }) => {
    const [userArticles, setUserArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const {
        userArticles: reduxUserArticles,
        loading: reduxLoading,
        error: reduxError,
    } = useSelector((state) => state.userArticles)

    useEffect(() => {
        setLoading(true)
        setError(null)

        dispatch(fetchUserArticles())
            .then(() => {
                if (reduxUserArticles) {
                    // setLoading(false)
                    setUserArticles(reduxUserArticles)
                }
                console.log('reduxUserArticles: ', reduxUserArticles)
            })
            .catch((error) => {
                // setLoading(false)
                setError(error.message || 'Failed to fetch user articles')
            })
    }, [dispatch])

    // console.log('loading: ' + loading)

    // if (loading || reduxLoading) {
    //     return <Typography.Text>Loading...</Typography.Text>
    // }

    if (error || reduxError) {
        return <Typography.Text>Error: {error || reduxError}</Typography.Text>
    }

    return (
        <div>
            <Typography.Title level={3}>Your Articles</Typography.Title>
            <Space wrap>
                {userArticles.map((article) => (
                    <Card
                        key={article.articleId}
                        hoverable
                        style={{ width: 240, marginBottom: 20 }}
                        cover={<img alt={article.title} src={article.imgUrl} />}
                    >
                        <Meta
                            title={article.title}
                            description={`Price: ${article.price}`}
                        />
                    </Card>
                ))}
            </Space>
        </div>
    )
}

export default UserArticles
