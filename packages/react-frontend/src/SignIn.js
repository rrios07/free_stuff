// src/SignUp.js
import React, { useState, useEffect } from 'react'
import Form from './SignInForm'

function SignIn() {
    const [found, setFound] = useState(true)

    function getUser(person) {
        const promise = fetch(
            `http://localhost:8000/users/${person.username}?email=${person.email}`
        )
        return promise
    }

    function login(person) {
        getUser(person)
            .then((res) => (res.status === 200 ? res.json() : undefined))
            .then((json) => {
                if (json) {
                    console.log('account found')
                    setFound(true)
                    //TODO in Sprint 3: redirect to a new page for email verification
                } else {
                    //404 error
                    console.log('account not found')
                    setFound(false)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className="container">
            <center>
                <h1>Login</h1>
            </center>
            <Form handleSubmit={login} />
            {!found && (
                <center>
                    <p style={{ color: 'red' }}>
                        {' '}
                        Incorrect username or email.
                    </p>
                </center>
            )}
        </div>
    )
}

export default SignIn
