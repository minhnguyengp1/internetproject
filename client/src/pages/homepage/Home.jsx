import { useState } from 'react'
import NewestArticle from './NewestArticle'
import './home.scss'
import SidebarMenu from './SidebarMenu'

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
        </div>
    )
}

export default Home
