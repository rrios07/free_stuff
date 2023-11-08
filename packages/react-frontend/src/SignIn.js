// src/SignUp.js
import React, { useState, useEffect } from 'react'
import Form from './SignInForm'

var found = true

function SignIn() {
    function getUser(person) {
        const promise = fetch(
            `Http://localhost:8000/users?username=${person.username}&email=${person.email}`
        )
        return promise
    }

    function login(person) {
        getUser(person)
            .then((res) => (res.status === 201 ? res.json() : undefined))
            .then((json) => {
                if (json) {
                    found = true
                } else {
                    //404 error
                    found = false
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
            {!found && <p> Incorrect username or email.</p>}
        </div>
    )
}

export default SignIn
