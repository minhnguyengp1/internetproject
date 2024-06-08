//SearchContext.jsx
import React, { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

export const useSearch = () => useContext(SearchContext)

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('')

    const value = {
        searchTerm,
        setSearchTerm,
    }

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}
