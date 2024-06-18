import { categories } from '../../assets/categories.js'
import './categorySidebar.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCategory } from '../../redux/actions/articleActions.js'

const CategorySidebar = () => {
    const dispatch = useDispatch()
    const { selectedCategory } = useSelector((state) => state.articleList)

    const handleCategorySelect = (category) => {
        dispatch(setSelectedCategory(category === 'alle-kategorien' ? null : category))
        console.log('Selected category in CategorySidebar:', category)
    }

    return (
        <div className="category-sidebar">
            <div className="sidebar-slide">
                <ul className="category-list">
                    {categories.map((category) => {
                        return (
                            <li
                                key={category.key}
                                className={`listItem ${category.key === selectedCategory ? 'active' : ''}`}
                                onClick={() => handleCategorySelect(category.key)}
                            >
                                {category.label}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default CategorySidebar
