import './categoryDropdown.scss'

const CategoryDropdown = ({ selectedCategory, setSelectedCategory }) => {
    return (
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-dropdown"
        >
            <option value="">Alle Kategorien</option>
            <option value="Elektronik">Elektronik</option>
            <option value="books">Bücher</option>
            <option value="clothing">Kleidung</option>
            <option value="home-garden">Heim & Garten</option>
            <option value="Sport">Sport</option>
        </select>
    )
}

export default CategoryDropdown
