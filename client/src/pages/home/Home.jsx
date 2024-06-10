import { useState } from 'react'
import NewestArticle from './NewestArticle.jsx'
import './home.scss'
import SidebarMenu from '../../components/sidebar-menu/SidebarMenu.jsx'
import HomeLayout from '../../layouts/homeLayout/HomeLayout.jsx'

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState()

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
    }

    return (
        <HomeLayout>
            <NewestArticle selectedCategory={selectedCategory} />
        </HomeLayout>
    )
}

export default Home
