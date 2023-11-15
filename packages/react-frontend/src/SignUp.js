// src/SignUp.js
import React, { useState, useEffect } from 'react'
import Table from './Table'
import Form from './CreateUserForm'

function SignUp() {
    const [characters, setCharacters] = useState([])

    function postUser(person) {
        const promise = fetch('Http://free-stuff-slo.azurewebsites.net/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        })

        return promise
    }
    function fetchUsers() {
        const promise = fetch('http://free-stuff-slo.azurewebsites.net/users')
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
            <center>
                <h1>Create Account</h1>
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

export default SignUp
