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
        const promise = fetch('https://free-stuff-slo.azurewebsites.net/users')
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
        const promise = fetch(
            'Https://free-stuff-slo.azurewebsites.net/users',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(person),
            }
        )

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
        const promise = fetch(
            'Https://free-stuff-slo.azurewebsites.net/posts',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            }
        )

        return promise
    }

    function deleteUser(index) {
        const person = characters[index]
        const promise = fetch(
            `Http://free-stuff-slo.azurewebsites.net/users/${person._id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(person),
            }
        )

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

    return (
        <div className="container">
            <Home
                Home={<SearchBar onSearch={SearchBar.handleSearch} />}
                Post={
                    <div>
                        <PostForm handleSubmit={updateList} />
                        <Post postData={[]} submitPost={submitPost} />
                    </div>
                }
                SignUp={<Form handleSubmit={updateList} />}
            />
            {/* <Table
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
            <p>{'Make a Post'}</p> */}
        </div>
    )
}

export default MyApp
