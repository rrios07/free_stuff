// src/CheckboxForm.js
import React, { useState } from 'react'

const CheckboxForm = () => {
  const [checkboxes, setCheckboxes] = useState({
    Kitchen: false,
    Desk: false,
    Electronic: false,
  })

  const handleCheckboxChange = (option) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [option]: !prevCheckboxes[option],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Send checkboxes data to the server (Express backend)
    console.log('Form submitted with checkboxes:', checkboxes)
  }
  
  const checkboxStyle = {
    marginLeft: '20px', // Adjust the value as needed for indentation
  };

  return (
    <div>
      <label style={checkboxStyle}>
        <input
          type="checkbox"
          checked={checkboxes.option1}
          onChange={() => handleCheckboxChange('option1')}
        />
        Kitchen
      </label>
      <label style={checkboxStyle}>
        <input
          type="checkbox"
          checked={checkboxes.option2}
          onChange={() => handleCheckboxChange('option2')}
        />
        Desk
      </label>
      <label style={checkboxStyle}>
        <input
          type="checkbox"
          checked={checkboxes.option3}
          onChange={() => handleCheckboxChange('option3')}
        />
        Electronic Appliance
      </label>
    </div>
  )
}

export default CheckboxForm