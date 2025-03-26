import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchInput from './SearchInput'
import useAuthStore from '../utils/AuthStore'

const buttonStyle = {
  padding: '2px',
}

const Navbar = () => {
  const { isLoggedIn, logoutUser, user } = useAuthStore()
  const navigate = useNavigate()
  
  const onClickLogoutHandler = () => {
    logoutUser()
    navigate('/')
  }
  const loggedIn = isLoggedIn()
  const isAdminOrAmbassador = loggedIn && (user?.role === 'admin' || user?.role === 'ambassador')

  return (
    <nav className="navbar" id="navbar">
      <ul style={{ display: 'flex', flexDirection: 'row', gap: '1em', alignItems: 'center' }}>
        <li className="navbar-item"><Link to="/">Home</Link></li>
        {!loggedIn && <li className="navbar-item"><Link to="/login">Login</Link></li>}
        {!loggedIn && <li className="navbar-item"><Link to="/signup">Sign Up</Link></li>}
        {loggedIn && <li className="navbar-item"><Link to="/profile">Profile</Link></li>}
        <li className="navbar-item"><Link to="/monuments">Monuments</Link></li>

        {isAdminOrAmbassador && <li className="navbar-item"><Link to="/approval-dashboard">Approval Dashboard</Link></li>}

        <li><SearchInput /></li>
        {loggedIn && <li><button style={buttonStyle} onClick={onClickLogoutHandler}>Logout</button></li>}
      </ul>
    </nav>
  )
}

export default Navbar
