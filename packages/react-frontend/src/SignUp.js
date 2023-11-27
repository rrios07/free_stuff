// src/SignUp.js
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from './Table'
import Form from './CreateUserForm'

function SignUp() {
    const [characters, setCharacters] = useState([])
    const [invEmail, setInvEmail] = useState(false)
    const [exists, setExists] = useState(false)
    const navigate = useNavigate()

    function postUser(person) {
        const promise = fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        })

        return promise
    }
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

    function updateList(person) {
        postUser(person)
            .then((res) => {
                if (res.status === 201) {
                    return res.json()
                } else if (res.status === 403) {
                    return -1 //invalid email
                } else {
                    return -2 //account already exists
                }
            })
            .then((json) => {
                setInvEmail(false)
                setExists(false)
                if (json === -1) {
                    console.log('invalid email')
                    setInvEmail(true)
                } else if (json === -2) {
                    console.log('existing account')
                    setExists(true)
                } else {
                    setCharacters([...characters, json])
                    navigate('../Sign In')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function deleteUser(index) {
        const person = characters[index]
        const promise = fetch(
            `Https://free-stuff-slo.azurewebsites.net/users/${person._id}`,
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
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />

            <Form handleSubmit={updateList} />
            {invEmail && (
                <center>
                    <p style={{ color: 'red' }}> Invalid email account.</p>
                </center>
            )}
            {exists && (
                <center>
                    <p style={{ color: 'red' }}>
                        {' '}
                        Username exists and/or email already linked to account.
                    </p>
                </center>
            )}
        </div>
    )
}

export default SignUp
