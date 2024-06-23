import PropTypes from 'prop-types'
import Header from '../../components/Header/Header.jsx'
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar.jsx'
import './searchResultsLayout.scss'

const SearchResultsLayout = ({ children }) => (
    <div className="search-results-layout">
        <Header />
        <div className="search-results-layout__content">
            <FilterSidebar className="filter-sidebar" />
            <div className="search-results-layout__main-content">
                {children}
            </div>
        </div>
    </div>
)

SearchResultsLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default SearchResultsLayout
