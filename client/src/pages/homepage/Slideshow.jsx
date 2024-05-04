import { Carousel } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './slideshow.scss'

const Slideshow = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/allArticles/'
                )
                setItems(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchArticles()
    }, [])

    const firstThreeItems = items.slice(0, 3)
    const nextThreeItems = items.slice(3, 6)

    return (
        <div className="slideshow">
            <Carousel autoplay speed={1000} autoplaySpeed={5000}>
                <div className="slides">
                    {firstThreeItems.map((item, index) => (
                        <img key={index} src={item.img} alt={item.name} />
                    ))}
                </div>
                <div className="slides">
                    {nextThreeItems.map((item, index) => (
                        <img key={index} src={item.img} alt={item.name} />
                    ))}
                </div>
            </Carousel>
        </div>
    )
}

export default Slideshow
