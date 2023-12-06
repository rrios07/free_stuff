// src/SignUp.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from './CreateUserForm'

function SignUp() {
    const [characters, setCharacters] = useState([])
    const [invEmail, setInvEmail] = useState(false)
    const [exists, setExists] = useState(false)
    const navigate = useNavigate()

    function postUser(person) {
        const promise = fetch(
            'http://localhost:8000/users',
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
    if (localStorage.getItem('user')) {
        return (
            <div className="container">
                <h2> User already logged in</h2>
            </div>
        )
    } else {
        return (
            <div className="container">
                <center>
                    <h1>Create Account</h1>
                </center>

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
                            Username exists and/or email already linked to
                            account.
                        </p>
                    </center>
                )}
            </div>
        )
    }
}

export default SignUp
