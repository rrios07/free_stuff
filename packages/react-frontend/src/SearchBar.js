import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (query.trim() !== '') {
            navigate(`/search/${query}`);
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default SearchBar
