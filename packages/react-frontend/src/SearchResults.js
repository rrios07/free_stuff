// src/SearchResults.js
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import Item from './Items.js'
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
                console.log(`Getting Response for ${query}`)
                const response = await fetch(
                    `Https://free-stuff-slo.azurewebsites.net/search?${query.trim()}`
                )
                console.log(response)

                const data = await response.json()

                // Wrap the single object in an array
                const resultsArray = Array.isArray(data) ? data : [data]

                // Update the state with the fetched search results
                console.log('API Response:', resultsArray)
                console.log(Array.isArray(resultsArray))
                setSearchResult(resultsArray)

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
                ) : searchResult.length > 0 ? (
                    <ul>
                        {searchResult.map((result) => (
                            <Item
                                name={result.title}
                                img={result.img}
                                user={
                                    result.user_name +
                                    '(' +
                                    result.user_id +
                                    ')'
                                }
                                desc={result.description}
                            ></Item>
                        ))}
                    </ul>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    )
}

export default SearchResults
