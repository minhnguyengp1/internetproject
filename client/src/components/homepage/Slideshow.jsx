import { Carousel } from 'antd'
import './slideshow.scss'

import bike1 from '../../assets/articlePhotos/bike1.jpg'
import bike2 from '../../assets/articlePhotos/bike2.jpg'
import bike3 from '../../assets/articlePhotos/bike3.jpg'
import bike4 from '../../assets/articlePhotos/bike4.jpg'
import bike5 from '../../assets/articlePhotos/bike5.jpg'
import bike6 from '../../assets/articlePhotos/bike6.jpg'

const Slideshow = () => {
    return (
        <div className="slideshow">
            <Carousel autoplay speed={1000} autoplaySpeed={5000}>
                <div className="slides">
                    <img src={bike1} alt="bike1" />
                    <img src={bike6} alt="bike6" />
                    <img src={bike5} alt="bike5" />
                </div>
                <div className="slides">
                    <img src={bike2} alt="bike2" />
                    <img src={bike4} alt="bike4" />
                    <img src={bike3} alt="bike3" />
                </div>
            </Carousel>
        </div>
    )
}

export default Slideshow
