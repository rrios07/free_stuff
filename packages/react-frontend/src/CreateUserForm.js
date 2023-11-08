// src/CreateuserForm.js
import React, { useState } from 'react'

function Form(props) {
    const [person, setPerson] = useState({
        username: '',
        email: '',
        name: '',
        address: '',
        zip: '',
    })

    function handleChange(event) {
        const { name, value } = event.target
        if (name === 'email')
            setPerson({
                username: person['username'],
                email: value,
                name: person['name'],
                address: person['address'],
                zip: person['zip'],
            })
        else if (name === 'name')
            setPerson({
                username: person['username'],
                email: person['email'],
                name: value,
                address: person['address'],
                zip: person['zip'],
            })
        else if (name === 'address')
            setPerson({
                username: person['username'],
                email: person['email'],
                name: person['name'],
                address: value,
                zip: person['zip'],
            })
        else if (name === 'zip')
            setPerson({
                username: person['username'],
                email: person['email'],
                name: person['name'],
                address: person['address'],
                zip: value,
            })
        else
            setPerson({
                username: value,
                email: person['email'],
                name: person['name'],
                address: person['address'],
                zip: person['zip'],
            })
    }
    function submitForm() {
        props.handleSubmit(person)
        setPerson({ username: '', email: '', name: '', address: '', zip: '' })
    }
    return (
        <form>
            <center>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    _id="username"
                    value={person.username}
                    onChange={handleChange}
                    style={{ width: 300 }}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    _id="email"
                    value={person.email}
                    onChange={handleChange}
                    style={{ width: 300 }}
                />
                <label htmlFor="email">Full Name</label>
                <input
                    type="text"
                    name="name"
                    _id="name"
                    value={person.name}
                    onChange={handleChange}
                    style={{ width: 300 }}
                />
                <label htmlFor="email">Address</label>
                <input
                    type="text"
                    name="address"
                    _id="address"
                    value={person.address}
                    onChange={handleChange}
                    style={{ width: 300 }}
                />
                <label htmlFor="email">ZIP Code</label>
                <input
                    type="text"
                    name="zip"
                    _id="zip"
                    value={person.zip}
                    onChange={handleChange}
                    style={{ width: 300 }}
                />
                <input
                    type="button"
                    value="Create"
                    style={{ background: '#04aa6d' }}
                    onClick={submitForm}
                />
            </center>
        </form>
    )
}

export default Form
