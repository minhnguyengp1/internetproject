import { useState } from 'react'
import { categories } from '../../assets/categories'
import './sidebarMenu.scss'

const SidebarMenu = ({ onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleCategorySelect = (key) => {
        const selectedItem = categories.find(
            (category) => category.label === key
        )
        if (selectedItem) {
            if (selectedItem.label === 'All Categories') {
                setSelectedCategory(null)
                onSelectCategory(null)
            } else {
                setSelectedCategory(selectedItem.label)
                onSelectCategory(selectedItem.label)
            }
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebarSlide">
                <ul className="list">
                    {categories.map((category, index) => (
                        <li
                            className="listItem"
                            key={index}
                            onClick={() => handleCategorySelect(category.label)}
                        >
                            {category.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SidebarMenu
