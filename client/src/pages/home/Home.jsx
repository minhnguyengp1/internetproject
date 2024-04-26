import { useState } from 'react'
import NewestArticle from '../../components/homepage/NewestArticle'
import Slideshow from '../../components/homepage/Slideshow'
import './home.scss'
import SidebarMenu from '../../components/homepage/SidebarMenu'

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState()

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
    }

    return (
        <div className="homePage">
            <div className="topSplit">
                <div className="leftSide">
                    <SidebarMenu onSelectCategory={handleCategorySelect} />
                </div>
                <NewestArticle selectedCategory={selectedCategory} />
            </div>
            <Slideshow />
        </div>
    )
}

export default Home
