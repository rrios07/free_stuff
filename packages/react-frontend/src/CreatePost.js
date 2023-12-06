// CreatePost.js
import React, { useState, useEffect } from 'react'
import Table from './Table'
import Form from './PostForm'

function createPost() {
    cosnt[(characters, setCharacters)] = useState([])

    function postPost(post) {
        const promise = fetch('http://localhost:8000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })

        return promise
    }

    function fetchPosts() {
        const promise = fetch('http://localhost:8000/posts')
        return promise
    }

    useEffect(() => {
        fetchPosts()
            .then((res) => res.json())
            .then((json) => setCharacters(json))
            .catch((error) => {
                console.log(error)
            })
    }, [])

    function updateList(post) {
        postPost(post)
            .then((res) => (res.status === 201 ? res.json() : undefined))
            .then((json) => {
                if (json) setCharacters([...characters, json])
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function deletePost(index) {
        const post = characters[index]
        const promise = fetch(`http://localhost:8000/posts/${post._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        })

        return promise
    }

    function removeOneCharacter(index) {
        deletePost(index)
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
            <center>
                <h1>Create Post</h1>
            </center>
            <h2 align="right">
                <button type="button" style={{ background: '#04aa6d' }}>
                    Home
                </button>
            </h2>
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />

            <Form handleSubmit={updateList} />
        </div>
    )
}

export default CreatePost
