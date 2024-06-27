import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { searchArticles } from '../../redux/actions/searchActions.js'
import SearchResultsLayout from '../../layouts/SearchResultsLayout/SearchResultsLayout.jsx'
import ArticleCard from '../../components/ArticleCard/ArticleCard.jsx'
import './searchResults.scss'

const SearchResults = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const { loading, results, error } = useSelector((state) => state.search)

    const queryParams = new URLSearchParams(location.search)
    const searchQuery = queryParams.get('q') || ''
    const category = location.pathname.split('/category/')[1]

    const initialFilter = {
        minPrice: queryParams.get('minPrice') || '',
        maxPrice: queryParams.get('maxPrice') || '',
        city: queryParams.get('city') || ''
    }

    const [filter, setFilter] = useState(initialFilter)

    useEffect(() => {
        dispatch(searchArticles(category, searchQuery, filter))
    }, [dispatch, category, searchQuery, filter])

    useEffect(() => {
        const updatedFilter = {
            minPrice: queryParams.get('minPrice') || '',
            maxPrice: queryParams.get('maxPrice') || '',
            city: queryParams.get('city') || ''
        }
        setFilter(updatedFilter)
    }, [location.search])

    return (
        <SearchResultsLayout>
            <div className="search-results">
                {loading && <div className="loading">Loading...</div>}
                {error && <div className="error">Error: {error}</div>}
                {results !== undefined && results.map((article) => {
                    return (
                        <ArticleCard
                            key={article.articleId}
                            className="card"
                            title={article.title}
                            price={article.price}
                            category={article.category}
                            img={article.imgUrls.length > 0 ? article.imgUrls[0] : ''}
                        />
                    )
                })}
            </div>
        </SearchResultsLayout>
    )
}

export default SearchResults
