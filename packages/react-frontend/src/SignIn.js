// src/SignUp.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from './SignInForm'
import AuthForm from './userAuth'

function SignIn() {
    const [found, setFound] = useState(true)
    const [user, setUser] = useState(undefined)
    const [code_err, setCodeErr] = useState(false)
    const [redir, setRedir] = useState(false)
    const [code, setCode] = useState('')
    const navigate = useNavigate()

    function getUser(person) {
        const promise = fetch(
            `https://free-stuff-slo.azurewebsites.net/users/${person.username}?email=${person.email}`
        )
        return promise
    }

    function getUserInfo(username) {
        const promise = fetch(
            `https://free-stuff-slo.azurewebsites.net/users/${username}`
        )
        return promise
    }

    function code_auth(input_code) {
        //have user input email code
        console.log(input_code)
        let code_int = Number(input_code)
        if (code_int === code) {
            console.log('correct code')
            getUserInfo(user.username)
                .then((res) => (res.status === 200 ? res.json() : undefined))
                .then((json) => {
                    if (json) {
                        console.log(json)
                        localStorage.setItem('user', JSON.stringify(json)) //store logged in username
                        navigate('../Profile')
                    } else {
                        //404 error
                        console.log('account not found')
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            console.log('incorrect code')
            setCodeErr(true)
        }
    }

    function login(person) {
        //input login credentials
        getUser(person)
            .then((res) => (res.status === 200 ? res.json() : undefined))
            .then((json) => {
                if (json) {
                    console.log(json)
                    setFound(true)
                    //TODO in Sprint 3: redirect to a new page for email verification
                    setRedir(true)
                    setCode(json)
                    console.log(code)
                    setUser(person)
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
    if (localStorage.getItem('user')) {
        return (
            <div className="container">
                <h2> User already logged in</h2>
            </div>
        )
    } else if (!redir) {
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
    } else {
        return (
            <div className="container">
                <AuthForm handleSubmit={code_auth} />
                {code_err && (
                    <center>
                        <p style={{ color: 'red' }}>
                            {' '}
                            Incorrect code. Try again.
                        </p>
                    </center>
                )}
            </div>
        )
    }
}

export default SignIn
