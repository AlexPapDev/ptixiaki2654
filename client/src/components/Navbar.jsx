import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchInput from './SearchInput'
import useAppStore from '../utils/AppStore'

const buttonStyle = {
  padding: '2px',
}

const Navbar = ({token}) => {
  const { isLoggedIn, logoutUser } = useAppStore()
  const navigate = useNavigate()
  const onClickLogoutHandler = () => {
    logoutUser()
    navigate('/')
  }
  const loggedIn = isLoggedIn()
  return (
    <nav className="navbar" id="navbar">
      <ul style={{display:'flex', flexDirection:'row', gap: '1em', alignItems: 'center'}}>
        <li class="navbar-item"><Link to="/">Home</Link></li>
        {!loggedIn && <li class="navbar-item"><Link to="/login">Login</Link></li>}
        {!loggedIn && <li class="navbar-item"><Link to="/signup">Sign Up</Link></li>}
        {loggedIn && <li class="navbar-item"><Link to='/profile'>Profile</Link></li>}
        <li class="navbar-item"><Link to="/monuments">Monuments</Link></li>
        <li><SearchInput /></li>
        {loggedIn && <li><button style={buttonStyle} onClick={onClickLogoutHandler}>Logout</button></li>}
      </ul>
    </nav>
  )
}

export default Navbar
