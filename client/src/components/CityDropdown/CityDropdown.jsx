import './cityDropdown.scss'
import { cities } from '../../assets/cities.js'

const CategoryDropdown = ({ selectedCity, setSelectedCity }) => {
    return (
        <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="city-dropdown"
        >
            <option value="">Alle Städte</option>
            {cities.map((city) => (
                <option key={city.key} value={city.key}>
                    {city.name}
                </option>
            ))}
        </select>
    )
}

export default CategoryDropdown
