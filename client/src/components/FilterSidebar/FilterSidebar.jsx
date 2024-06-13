import React, { useState } from 'react'
import './filterSidebar.scss'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.jsx'
import { useLocation, useNavigate } from 'react-router-dom'

const FilterSidebar = ({ onFilterChange }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search)
    const firstSelectedCategory = location.pathname.split('/category/')[1]
    const query = queryParams.get('q') || ''

    const [selectedCategory, setSelectedCategory] = useState(firstSelectedCategory)
    const [selectedBundesland, setSelectedBundesland] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    // const handleCategoryChange = (e) => {
    //     setSelectedCategory(e.target.value)
    //     onFilterChange({ category: e.target.value, minPrice, maxPrice })
    // }

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value)
    }

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value)
    }

    const handleApplyFilter = () => {
        const categoryPath = selectedCategory ? `/category/${selectedCategory}` : ''
        const searchPath = query ? `?q=${query}` : ''
        const priceParams = `minPrice=${minPrice}&maxPrice=${maxPrice}`
        const bundeslandParam = selectedBundesland ? `bundesland=${selectedBundesland}` : ''
        navigate(`/search${categoryPath}${searchPath}&${priceParams}&${bundeslandParam}`)
    }

    return (
        <div className="filter-sidebar">
            <h2>Filter Options</h2>
            <div className="filter-group category-filter">
                <label>Category</label>
                <CategoryDropdown
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>
            <div className="filter-group price-filter">
                <label>Price Range</label>
                <div className="price-inputs">
                    <input type="number" placeholder="Von" value={minPrice} onChange={handleMinPriceChange} />
                    <input type="number" placeholder="Bis" value={maxPrice} onChange={handleMaxPriceChange} />
                </div>
                <button className="apply-btn" onClick={handleApplyFilter}>Apply</button>
            </div>
            <div className="filter-group bundesland-filter"> {/* New div wrapper */}
                {/*<BundeslandFilter*/}
                {/*    selectedBundesland={selectedBundesland}*/}
                {/*    setSelectedBundesland={setSelectedBundesland}*/}
                {/*/>*/}
            </div>
        </div>
    )
}

export default FilterSidebar
