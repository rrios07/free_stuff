// src/index.js
import React from 'react'
import ReactDOMClient from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom'
import MyApp from './MyApp'
//import SignIn from './SignIn'
//import SignUp from './SignUp'
import './index.css'

const container = document.getElementById('root')

// Create a root
const root = ReactDOMClient.createRoot(container)

// Initial render:
root.render(<MyApp />)
//root.render(<SignUp />)
//root.render(<SignIn />)
//test
