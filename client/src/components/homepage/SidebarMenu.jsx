import { useState } from 'react'
import { items } from '../../assets/categories'
import './sidebarMenu.scss'

const SidebarMenu = ({ onSelectCategory }) => {
    // eslint-disable-next-line
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleCategorySelect = (key) => {
        const selectedItem = items.find((item) => item.key === key)
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
                    {items.map((item, index) => (
                        <li key={index} className="listItem">
                            <button
                                className="listItemButton"
                                onClick={() => handleCategorySelect(item.key)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SidebarMenu
