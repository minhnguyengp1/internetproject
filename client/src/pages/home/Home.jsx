import { useState } from 'react'
import Categories from '../../components/homepage/Categories'
import NewestArticle from '../../components/homepage/NewestArticle'
import Slideshow from '../../components/homepage/Slideshow'
import './home.scss'

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState()

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
    }

    return (
        <div className="homePage">
            <Slideshow />
            <div className="topSplit">
                <Categories onSelectCategory={handleCategorySelect} />
                <NewestArticle selectedCategory={selectedCategory} />
            </div>
        </div>
    )
}

export default Home
