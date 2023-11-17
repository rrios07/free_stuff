// src/Routes.js
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MyApp from './MyApp'
import SearchResults from './SearchResults'

const RoutesApp = () => {
  return (

    <Routes>
      <Route path="/" element={<MyApp />} />
      <Route path="/search/:query" element={<SearchResults />} />
    </Routes>

  )
}

export default RoutesApp