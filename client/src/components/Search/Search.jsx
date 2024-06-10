import { useState } from 'react'

const Search = ({ onSearch }) => {
    const [input, setInput] = useState('')

    const handleChange = (e) => {
        const value = e.target.value
        setInput(value)
        onSearch(value)
    }

    return (
        <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Search..."
        />
    )
}

export default Search
