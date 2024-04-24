import Categories from '../../components/homepage/Categories'
import NewestArticle from '../../components/homepage/NewestArticle'
import Slideshow from '../../components/homepage/Slideshow'
import './home.scss'

const Home = () => {
    return (
        <div className="homePage">
            <Slideshow />
            <div className="topSplit">
                <Categories />
                <NewestArticle />
            </div>
        </div>
    )
}

export default Home
