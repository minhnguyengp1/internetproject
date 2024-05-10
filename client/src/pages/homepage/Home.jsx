import { useState } from 'react'
import NewestArticle from './NewestArticle'
import './home.scss'
import SidebarMenu from './SidebarMenu'

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState()
    const [searchTerm, setSearchTerm] = useState('')

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
    }

    const handleSearch = (term) => {
        setSearchTerm(term)
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
