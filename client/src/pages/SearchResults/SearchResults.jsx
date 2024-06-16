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
    const navigate = useNavigate()

    const { loading, results, error } = useSelector((state) => state.search)

    const queryParams = new URLSearchParams(location.search)
    const searchQuery = queryParams.get('q') || ''
    const category = location.pathname.split('/category/')[1]

    // Parse the filter parameters from the URL
    const filterParams = new URLSearchParams(location.search)
    const initialFilter = {
        category: queryParams.get('category') || '',
        minPrice: queryParams.get('minPrice') || '',
        maxPrice: queryParams.get('maxPrice') || ''
    }

    const [filter, setFilter] = useState(initialFilter)

    console.log('searchQuery: ', searchQuery)
    console.log('filter: ', filter)
    console.log('results: ', results)

    useEffect(() => {
        console.log('useEffect')
        dispatch(searchArticles(searchQuery, filter))
    }, [dispatch, searchQuery, filter])

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter)
    }

    return (
        <SearchResultsLayout>
            <div className="search-results">
                {loading && <div className="loading">Loading...</div>}
                {error && <div className="error">Error: {error}</div>}
                {results !== undefined && results.map((article) => {
                    console.log('article: ', article)
                    return (
                        <ArticleCard
                            key={article.articleId}
                            className="card"
                            title={article.title}
                            price={article.price}
                            category={article.category}
                            img={article.imgUrl}
                        />
                    )
                })}
            </div>
        </SearchResultsLayout>
    )
}

export default SearchResults
