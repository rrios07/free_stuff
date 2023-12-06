// src/PostForm.js
import React, { useState } from 'react'

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
    })

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
        setPostInfo((prevData) => ({
            ...prevData,
            pickup_or_delivery: e.target.value,
        }))
    }

    function submitPostForm() {
        console.log(PostInfo)
        props.handleSubmit(PostInfo)
        setPostInfo({
            title: '',
            categories: {
                Kitchen: false,
                Desk: false,
                Electronic: false,
            },
            description: '',
            pickup_or_delivery: '',
        })
    }

    const checkboxStyle = {
        marginLeft: '20px', // Adjust the value as needed for indentation
    }

    return (
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
            {/* Include CheckboxForm as part of YourFormComponent */}
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
                        onChange={() => updateCheckboxState('Electronic')}
                    />
                    Electronic Appliance
                </label>
            </div>
            <div htmlFor="PickupDelivery">
                Pickup and/or Delivery
                <label>
                    <input
                        type="radio"
                        value="Pickup"
                        checked={PostInfo.radioOption === 'Pickup'}
                        onChange={handleRadioChange}
                    />
                    Pickup
                </label>
                <label>
                    <input
                        type="radio"
                        value="Delivery"
                        checked={PostInfo.radioOption === 'Delivery'}
                        onChange={handleRadioChange}
                    />
                    Delivery
                </label>
                <label>
                    <input
                        type="radio"
                        value="Both"
                        checked={PostInfo.radioOption === 'Both'}
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
            <input type="button" value="Post" onClick={submitPostForm} />
        </form>
    )
}

export default PostForm
