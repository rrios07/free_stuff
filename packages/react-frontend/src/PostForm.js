// src/PostForm.js
import React, { useState } from 'react'
import CheckboxForm from './CheckboxForm.js'

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


    const handleRadioChange = (e) => {
        setPostInfo((prevData) => ({
          ...prevData,
          radioOption: e.target.value,
        }))
    }

    function submitPostForm() {
        props.handleSubmit(PostInfo)
        setPostInfo({ item: '', iType: '' })
    }
    return (
        <form>
            Create a new post
            <label htmlFor="Title">Title</label>
            <input
                type="text"
                name="Title"
                _id="Title"
                value={PostInfo.Title}
                onChange={handlePostChange}
            />
            <label htmlFor="Categories">Categories</label>
                {/* Include CheckboxForm as part of YourFormComponent */}
                <CheckboxForm />
            <div htmlFor="PickupDelivery">
                Pickup and/or Delivery
                <label>
                    <input
                        type="radio"
                        value="option1"
                        checked={PostInfo.radioOption === 'option1'}
                        onChange={handleRadioChange}
                    />
                    Pickup
                </label>
                <label>
                    <input
                        type="radio"
                        value="option2"
                        checked={PostInfo.radioOption === 'option2'}
                        onChange={handleRadioChange}
                    />
                    Delivery
                </label>
                <label>
                    <input
                        type="radio"
                        value="option3"
                        checked={PostInfo.radioOption === 'option3'}
                        onChange={handleRadioChange}
                    />
                    Both
                </label>
            </div>
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