// src/CreateuserForm.js
import React, { useState, useRef } from 'react'

function Form(props) {
    const userRef = useRef(null)
    const emailRef = useRef(null)
    const [err, setErr] = useState(false)

    const [person, setPerson] = useState({
        username: '',
        email: '',
    })

    function handleChange(event) {
        const { name, value } = event.target
        if (name === 'email')
            setPerson({
                username: person['username'],
                email: value,
            })
        else
            setPerson({
                username: value,
                email: person['email'],
            })
    }
    function submitForm() {
        if (
            userRef.current.value.trim() === '' ||
            userRef.current.value.trim() === ''
        ) {
            console.log('A field is empty')
            setErr(true)
        } else {
            setErr(false)
            props.handleSubmit(person)
        }
        setPerson({ username: '', email: '' })
    }
    return (
        <form>
            <center>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    _id="username"
                    ref={userRef}
                    value={person.username}
                    onChange={handleChange}
                    style={{ width: 300 }}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    _id="email"
                    ref={emailRef}
                    value={person.email}
                    onChange={handleChange}
                    style={{ width: 300 }}
                />
                <input
                    type="button"
                    value="Sign In"
                    style={{ background: '#04aa6d' }}
                    onClick={submitForm}
                />
                {err && (
                    <p style={{ color: 'red' }}> Both fields must be filled.</p>
                )}
            </center>
        </form>
    )
}

export default Form
