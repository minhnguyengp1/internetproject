import './categoryDropdown.scss'
import { categories } from '../../assets/categories.js'

const CategoryDropdown = ({ selectedCategory, setSelectedCategory }) => {
    return (
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-dropdown"
        >
            {categories.map((category) => (
                <option key={category.key} value={category.key}>
                    {category.label}
                </option>
            ))}
        </select>
    )
}

export default CategoryDropdown
