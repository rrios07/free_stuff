import React, { useState, useRef } from 'react'

function AuthForm(props) {
    const codeRef = useRef(null)
    const [err, setErr] = useState(false)

    const [code, setCode] = useState('')

    function handleChange(event) {
        const { value } = event.target
        setCode(value)
    }
    function submitForm() {
        if (codeRef.current.value.trim() === '') {
            console.log('Error: Login code is empty')
            setErr(true)
        } else {
            setErr(false)
        }
        props.handleSubmit(code)
        setCode('')
    }
    return (
        <form>
            <center>
                <label htmlFor="code">One Time Login Code</label>
                <input
                    type="text"
                    name="code"
                    _id="code"
                    ref={codeRef}
                    value={code}
                    onChange={handleChange}
                    style={{ width: 300 }}
                />
                <input
                    type="button"
                    value="Submit"
                    style={{ background: '#04aa6d' }}
                    onClick={submitForm}
                />
                {err && <p style={{ color: 'red' }}> Code cannot be empty.</p>}
            </center>
        </form>
    )
}

export default AuthForm
