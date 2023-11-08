// src/MyApp.js
import React, { useState, useEffect } from 'react'
import Table from './Table'
import Form from './CreateUserForm'
import Home from './HomePage.js'
import Post from './Post.js'
import PostForm from './PostForm.js'
import SearchBar from './SearchBar'

function MyApp() {
    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [characters, setCharacters] = useState([])

    function fetchUsers() {
        const promise = fetch('http://localhost:8000/users')
        return promise
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json))
            .catch((error) => {
                console.log(error)
            })
    }, [])

    function postUser(person) {
        const promise = fetch('Http://localhost:8000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        })

        return promise
    }

    function updateList(person) {
        postUser(person)
            .then((res) => (res.status === 201 ? res.json() : undefined))
            .then((json) => {
                if (json) setCharacters([...characters, json])
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function submitPost(postData) {
        const promise = fetch('Http://localhost:8000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })

        return promise
    }

    function deleteUser(index) {
        const person = characters[index]
        const promise = fetch(`Http://localhost:8000/users/${person._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        })

        return promise
    }

    function removeOneCharacter(index) {
        deleteUser(index)
            .then((res) => {
                if (res.status === 204) {
                    const updated = characters.filter((character, i) => {
                        return i !== index
                    })
                    setCharacters(updated)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
        <div className="container">
            <Home />
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <p>{'Username and password'}</p>
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((result, index) => (
                        <li key={index}>{result}</li>
                    ))}
                </ul>
            ) : (
                <p>No search results found.</p>
            )}
            <Form handleSubmit={updateList} />
            <SearchBar onSearch={handleSearch} />
            <p>{'Make a Post'}</p>
            <Post postData={[]} submitPost={submitPost} />

            <PostForm handleSubmit={updateList} />
        </div>
    )
}

export default MyApp
