import { useState } from 'react'
import NewestArticle from './NewestArticle'
import './home.scss'
import SidebarMenu from './SidebarMenu.jsx'
import Header from '../../components/Header.jsx'
import Footer from '../../components/Footer.jsx'

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
        <div className="homeContainer">
            <Header />
            <div className="homePage">
                <div className="topSplit">
                    <div className="leftSide">
                        <SidebarMenu onSelectCategory={handleCategorySelect} />
                    </div>
                    <NewestArticle selectedCategory={selectedCategory} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
