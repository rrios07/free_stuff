// src/MyApp.js
import React, { useState, useEffect } from 'react'
import Form from './CreateUserForm'
import Home from './HomePage.js'
import Post from './Post.js'
import PostForm from './PostForm.js'
import Item from './Items.js'
import { BrowserRouter } from 'react-router-dom'

function MyApp() {
    const [characters, setCharacters] = useState([])

    function fetchUsers() {
        const promise = fetch('Https://free-stuff-slo.azurewebsites.net/users')
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

    return (
        <div className="container">
            <Home
                Post={
                    <div>
                        <PostForm handleSubmit={submitPost} />
                        <Post postData={[]} submitPost={submitPost} />
                    </div>
                }
                SignUp={<Form handleSubmit={updateList} />}
                Home="WELCOME TO SLO FREE STUFF"
            />
        </div>
    )
}

export default MyApp
