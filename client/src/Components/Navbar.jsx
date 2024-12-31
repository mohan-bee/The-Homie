import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
        <Link to={'/'} className='logo'><h1>The Homie</h1> </Link>
    </div>
  )
}

export default Navbar