// src/SearchResults.js
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SearchBar from './SearchBar'
// import HomeBody from './HomePage'

const SearchResults = () => {
    const { query } = useParams()

    // State to store the search results
    const [searchResult, setSearchResult] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSearchResult = async () => {
            try {
                // Make a fetch request to your backend API
                const response = await fetch(
                    `http://localhost:8000/search?query=${query.trim()}`
                )
                const data = await response.json()

                // Wrap the single object in an array
                const resultsArray = Array.isArray(data) ? data : [data]

                // Update the state with the fetched search results
                console.log('SearchResult Before:', searchResult)
                console.log('API Response:', data)
                console.log(Array.isArray(data))
                setSearchResult(data)
                console.log('SearchResult After:', searchResult)

                setLoading(false)
            } catch (error) {
                console.error('Error fetching search results:', error)

                setLoading(false)
            }
        }

        // Call the fetchSearchResults function when the component mounts
        fetchSearchResult()
    }, [query])
    // Re-run the effect when the query parameter changes

    return (
        <div>
            <div>
                <h2>Search Results for: {query}</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : Array.isArray(searchResult.results) ? (
                    <ul>{searchResult.results}</ul>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    )
}

export default SearchResults
