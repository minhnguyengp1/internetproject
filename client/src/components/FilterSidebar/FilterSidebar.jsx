import React, { useState } from 'react'
import './filterSidebar.scss'

const FilterSidebar = ({ onFilterChange }) => {
    const [category, setCategory] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
        onFilterChange({ category: e.target.value, minPrice, maxPrice })
    }

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value)
        onFilterChange({ category, minPrice: e.target.value, maxPrice })
    }

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value)
        onFilterChange({ category, minPrice, maxPrice: e.target.value })
    }

    return (
        <div className="filter-sidebar">
            <h2>Filter Results</h2>
            <div className="filter-group">
                <label>Category</label>
                <input type="text" value={category} onChange={handleCategoryChange} />
            </div>
            <div className="filter-group">
                <label>Min Price</label>
                <input type="number" value={minPrice} onChange={handleMinPriceChange} />
            </div>
            <div className="filter-group">
                <label>Max Price</label>
                <input type="number" value={maxPrice} onChange={handleMaxPriceChange} />
            </div>
            {/* Add more filters as needed */}
        </div>
    )
}

export default FilterSidebar
