// src/PostForm.js
import React, { useState } from 'react'
const { v4: uuidv4 } = require('uuid')

function PostForm(props) {
    const [PostInfo, setPostInfo] = useState({
        title: '',
        categories: {
            Kitchen: false,
            Desk: false,
            Electronic: false,
        },
        description: '',
        pickup_or_delivery: '',
        user_id: '',
        user_name: '',
        post_id: uuidv4(),
    })
    const [showForm, setShowForm] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [buttonClicked, setButtonClicked] = useState(false)

    function handlePostChange(event) {
        const { name, value, type, checked } = event.target
        console.log(event.target)
        console.log(name, type)
        if (type === 'checkbox') {
            console.log('Starting checkbox check:')
            // Handle checkbox changes for categories
            setPostInfo((prevPostInfo) => {
                if (checked) {
                    console.log('checked')
                    // If checkbox is checked, add the category to the list
                    return {
                        ...prevPostInfo,
                        categories: {
                            ...prevPostInfo.categories,
                            [name]: true,
                        },
                    }
                } else {
                    console.log('not checked')
                    // If checkbox is unchecked, remove the category from the list
                    return {
                        ...prevPostInfo,
                        categories: {
                            ...prevPostInfo.categories,
                            [name]: false,
                        },
                    }
                }
            })
        } else {
            // Handle other input changes
            setPostInfo((prevPostInfo) => ({
                ...prevPostInfo,
                [name]: value,
            }))
        }
        console.log(PostInfo)
    }

    const updateCheckboxState = (option) => {
        console.log(!PostInfo.categories[option])
        let categories = PostInfo.categories
        categories[option] = !categories[option]
        setPostInfo((prevPostInfo) => ({
            ...prevPostInfo,
            categories,
        }))
        console.log(PostInfo)
    }

    const handleRadioChange = (e) => {
        console.log(e)
        setPostInfo((prevPostInfo) => ({
            ...prevPostInfo,
            pickup_or_delivery: e.target.value,
        }))
    }

    function submitPostForm() {
        console.log(PostInfo)
        props.handleSubmit(PostInfo)
        setPostInfo((prevPostInfo) => ({
            ...prevPostInfo,
            title: '',
            categories: {
                Kitchen: false,
                Desk: false,
                Electronic: false,
            },
            description: '',
            pickup_or_delivery: '',
        }))
    }

    const handleButtonClick = () => {
        if (!buttonClicked) {
            setButtonClicked(true)
        }
        if (localStorage.getItem('user')) {
            setShowForm(true)
            let userDataJson = localStorage.getItem('user')
            const userData = JSON.parse(userDataJson)
            setPostInfo((prevPostInfo) => ({
                ...prevPostInfo,
                user_id: userData[0]._id,
                user_name: userData[0].username,
            }))
            console.log(PostInfo)
        } else {
            setLoggedIn(false)
        }
    }

    const checkboxStyle = {
        marginLeft: '20px', // Adjust the value as needed for indentation
    }

    return (
        <div>
            {!showForm && !loggedIn && (
                <button onClick={handleButtonClick}>Create Post</button>
            )}
            {!showForm && !loggedIn && buttonClicked && (
                <p style={{ color: 'red' }}>
                    You must log in to create a Post.
                </p>
            )}
            {showForm && (
                <form>
                    Create a new post
                    <label htmlFor="Title">Title</label>
                    <input
                        type="text"
                        name="title"
                        _id="title"
                        value={PostInfo.Title}
                        onChange={handlePostChange}
                    />
                    <label htmlFor="Categories">Categories</label>
                    <div>
                        <label htmlFor="categories" style={checkboxStyle}>
                            <input
                                type="checkbox"
                                name="Kitchen"
                                checked={PostInfo.categories.Kitchen}
                                onChange={() => updateCheckboxState('Kitchen')}
                            />
                            Kitchen
                        </label>
                        <label style={checkboxStyle}>
                            <input
                                type="checkbox"
                                name="Desk"
                                checked={PostInfo.categories.Desk}
                                onChange={() => updateCheckboxState('Desk')}
                            />
                            Desk
                        </label>
                        <label style={checkboxStyle}>
                            <input
                                type="checkbox"
                                name="Electronic"
                                checked={PostInfo.categories.Electronic}
                                onChange={() =>
                                    updateCheckboxState('Electronic')
                                }
                            />
                            Electronic Appliance
                        </label>
                    </div>
                    <label htmlFor="Pickup and/or Delivery">
                        Pickup and/or Delivery
                    </label>
                    <div htmlFor="PickupDelivery">
                        <label>
                            <input
                                type="radio"
                                value="Pickup"
                                checked={
                                    PostInfo.pickup_or_delivery === 'Pickup'
                                }
                                onChange={handleRadioChange}
                            />
                            Pickup
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Delivery"
                                checked={
                                    PostInfo.pickup_or_delivery === 'Delivery'
                                }
                                onChange={handleRadioChange}
                            />
                            Delivery
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Both"
                                checked={PostInfo.pickup_or_delivery === 'Both'}
                                onChange={handleRadioChange}
                            />
                            Both
                        </label>
                    </div>
                    <label htmlFor="Description">Description</label>
                    <input
                        type="text"
                        name="description"
                        _id="description"
                        value={PostInfo.Type}
                        onChange={handlePostChange}
                    />
                    <input
                        type="button"
                        value="Create Post"
                        onClick={submitPostForm}
                    />
                </form>
            )}
        </div>
    )
}

export default PostForm
