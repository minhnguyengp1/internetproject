import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { searchArticles } from '../../redux/actions/searchActions.js'
import HomeLayout from '../../layouts/homeLayout/HomeLayout.jsx'
import SearchResultsLayout from '../../layouts/SearchResultLayout/SearchResultLayout.jsx'

const SearchResults = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const { loading, results, error } = useSelector((state) => state.search)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const query = queryParams.get('q')
        const category = location.pathname.split('/category/')[1]

        let searchQuery = query ? query : ''
        if (category) searchQuery = `${category} ${searchQuery}`

        if (searchQuery) {
            dispatch(searchArticles(searchQuery))
        }
    }, [dispatch, location.search, location.pathname])

    return (
        <SearchResultsLayout>
            {/*<h1>Search Results</h1>*/}
            {/*{loading && <p>Loading...</p>}*/}
            {/*{error && <p>Error: {error}</p>}*/}
            {/*{results && results.length > 0 ? (*/}
            {/*    <ul>*/}
            {/*        {results.map((result) => (*/}
            {/*            <li key={result.id}>{result.name}</li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*) : (*/}
            {/*    <p>No results found.</p>*/}
            {/*)}*/}

        </SearchResultsLayout>
    )
}

export default SearchResults
