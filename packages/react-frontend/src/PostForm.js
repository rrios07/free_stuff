// src/PostForm.js

import React, { useState } from 'react'

function PostForm(props) {
    const [PostInfo, setPostInfo] = useState({
        item: '',
        iType: '',
    })

    function handlePostChange(event) {
        const { name, value } = event.target
        if (name === 'iType')
            setPostInfo({ item: PostInfo['item'], iType: value })
        else setPostInfo({ item: value, iType: PostInfo['iType'] })
    }
    function submitPostForm() {
        props.handleSubmit(PostInfo)
        setPostInfo({ item: '', iType: '' })
    }
    return (
        <form>
            <label htmlFor="Title">Item</label>
            <input
                type="text"
                name="Title"
                _id="Title"
                value={PostInfo.Title}
                onChange={handlePostChange}
            />
            <label htmlFor="Type">Category</label>
            <input
                type="text"
                name="Type"
                _id="Type"
                value={PostInfo.Type}
                onChange={handlePostChange}
            />
            <label htmlFor="Pickup">
                Pickup / Delivery (P, D, B for both){' '}
            </label>
            <input
                type="text"
                name="Pickup"
                _id="Pickup"
                value={PostInfo.Type}
                onChange={handlePostChange}
            />
            <label htmlFor="Description">Description</label>
            <input
                type="text"
                name="Desc"
                _id="Desc"
                value={PostInfo.Type}
                onChange={handlePostChange}
            />
            <input type="button" value="Post" onClick={submitPostForm} />
        </form>
    )
}

export default PostForm
