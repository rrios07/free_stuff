import React, { useState, useEffect } from 'react'

function SearchBar() {
    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `Http://localhost:8000/search?query=${query}`
            )
            if (response.ok) {
                const data = await response.json()
                setSearchResults(data.results)
            } else {
                console.error(
                    'Search request failed:',
                    response.status,
                    response.statusText
                )
            }
        } catch (error) {
            console.error(
                'An error occurred while fetching search results:',
                error
            )
        }
    }

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
            <div>
                {searchResults.map((result, index) => (
                    <div key={index}>{result}</div>
                ))}
            </div>
        </div>
    )
}

export default SearchBar
