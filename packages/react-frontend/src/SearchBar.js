import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SearchBar = () => {
    const [query, setQuery] = useState('')

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <Link
                to={`/search/${query}`}
                style={{
                    color: 'black',
                    padding: '15px 15px',
                    textDecoration: 'none',
                    fontSize: '25px',
                }}
            >
                {'Search'}
            </Link>
        </div>
    )
}

export default SearchBar
