import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home'
import Editor from './Components/Editor'
import Admin from './Components/admin'
import './App.css'
import Page from './Components/Page'
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