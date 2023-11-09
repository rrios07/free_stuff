// src/SignUp.js
import React, { useState, useEffect } from 'react'
import Form from './SignInForm'

function SignIn() {
    const [found, setFound] = useState(true)

    function getUser(person) {
        const promise = fetch(
            `Http://localhost:8000/users?username=${person.username}&email=${person.email}`
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
