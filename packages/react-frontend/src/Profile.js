import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile(props) {
    const navigate = useNavigate()

    function logOut() {
        localStorage.clear()
        navigate('../')
    }

    if (localStorage.getItem('user')) {
        let user = JSON.parse(localStorage.getItem('user'))[0]
        console.log(user)
        return (
            <div className="container">
                <table>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Full Name</td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{user.address}</td>
                        </tr>
                        <tr>
                            <td>Zip Code</td>
                            <td>{user.zip}</td>
                        </tr>
                    </tbody>
                </table>
                <input
                    type="button"
                    value="Logout"
                    style={{ background: '#259e49' }}
                    onClick={logOut}
                />
            </div>
        )
    } else {
        return (
            <div className="container">
                <h2> No user logged in </h2>
            </div>
        )
    }
}

export default Profile
