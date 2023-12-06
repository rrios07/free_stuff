import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ItemView() {
    const { query } = useParams()

    const [loading, setLoading] = useState(true)
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        const fetchSearchResult = async () => {
            try {
                // Make a fetch request to your backend API
                console.log('Getting Response')
                const response = await fetch(
                    `https://free-stuff-slo.azurewebsites.net/posts/${query.trim()}`
                )
                console.log(response)

                const data = await response.json()

                // Update the state with the fetched search results
                console.log('API Response:', data)

                setLoading(false)
                setSearchResult(data[0])
            } catch (error) {
                console.error('Error fetching search results:', error)

                setLoading(false)
            }
        }

        // Call the fetchSearchResults function when the component mounts
        fetchSearchResult()
    }, [query])

    var img_prop =
        'https://cdn.iconscout.com/icon/premium/png-256-thumb/not-available-2685170-2232747.png'
    return (
        <div>
            <h4>{searchResult.title}</h4>
            <img src={img_prop}></img>
            <p>{searchResult.description}</p>
            <p>Offered By: {searchResult.user_name}</p>
            <p>{searchResult.pickup_or_delivery}</p>
            <button type="button" onClick={null}>
                Pick Up Item
            </button>
        </div>
    )
}

export default ItemView
