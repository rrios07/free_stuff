// src/Form.js
import React, { useState } from 'react'

function Form(props) {
    const [person, setPerson] = useState({
        username: '',
        email: '',
    })

    function handleChange(event) {
        const { name, value } = event.target
        if (name === 'email')
            setPerson({ username: person['username'], email: value })
        else setPerson({ username: value, email: person['email'] })
    }
    function submitForm() {
        props.handleSubmit(person)
        setPerson({ username: '', email: '' })
    }
    return (
        <form>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                _id="username"
                value={person.username}
                onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
                type="text"
                name="email"
                _id="email"
                value={person.email}
                onChange={handleChange}
            />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    )
}

export default Form
