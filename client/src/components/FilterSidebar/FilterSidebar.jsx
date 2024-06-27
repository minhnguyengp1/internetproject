import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.jsx'
import CityDropdown from '../CityDropdown/CityDropdown.jsx'
import './filterSidebar.scss'

const FilterSidebar = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [query, setQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [city, setCity] = useState('')

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const initialSelectedCategory =
            location.pathname.split('/category/')[1] || ''
        const initialSelectedCity = queryParams.get('city') || ''
        const initialQuery = queryParams.get('q') || ''
        const initialMinPrice = queryParams.get('minPrice') || ''
        const initialMaxPrice = queryParams.get('maxPrice') || ''

        setQuery(initialQuery)
        setSelectedCategory(initialSelectedCategory)
        setCity(initialSelectedCity)
        setMinPrice(initialMinPrice)
        setMaxPrice(initialMaxPrice)
    }, [location])

    const handlePriceChange = (e) => {
        const { name, value } = e.target
        if (name === 'minPrice') {
            setMinPrice(value)
        } else if (name === 'maxPrice') {
            setMaxPrice(value)
        }
    }

    const handleApplyFilter = () => {
        const params = new URLSearchParams()
        if (query) params.append('q', query)
        if (minPrice) params.append('minPrice', minPrice)
        if (maxPrice) params.append('maxPrice', maxPrice)
        if (city) params.append('city', city)

        const categoryPath = selectedCategory
            ? `/category/${selectedCategory}`
            : ''
        const queryString = params.toString()

        navigate(
            `/search${categoryPath}${queryString ? `?${queryString}` : ''}`
        )
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
                    <input
                        type="number"
                        name="minPrice"
                        placeholder="Von"
                        value={minPrice}
                        onChange={handlePriceChange}
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        placeholder="Bis"
                        value={maxPrice}
                        onChange={handlePriceChange}
                    />
                </div>
            </div>
            <div className="filter-group city-filter">
                <label>City</label>
                <CityDropdown selectedCity={city} setSelectedCity={setCity} />
            </div>
            <button className="apply-btn" onClick={handleApplyFilter}>
                Apply
            </button>
        </div>
    )
}

export default FilterSidebar
