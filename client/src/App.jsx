import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home'
import Editor from './Components/Editor'

import './App.css'
import Page from './Components/Page'
import Admin from './Components/Admin'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>} />
      <Route path='post/:id' element={<Page/>} />
      <Route path='/admin/new' element={<Editor/>} />
      <Route path='/admin' element={<Admin/>} />

    </Routes>
    </BrowserRouter>
  )
}

export default App