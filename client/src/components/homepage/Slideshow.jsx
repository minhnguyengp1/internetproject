import { Carousel } from 'antd'
import './slideshow.scss'
import { items } from '../../assets/articlePhotos'

const Slideshow = () => {
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
