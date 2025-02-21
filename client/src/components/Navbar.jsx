import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchInput from './SearchInput'
import useAppStore from '../utils/AppStore'
import Logout from '../utils/Logout'
// import './Navbar.css' // External CSS for navbar

const Navbar = ({token}) => {
  const { isLoggedIn, logoutUser } = useAppStore()
  const navigate = useNavigate()
  const onClickLogoutHandler = () => {
    logoutUser()
    navigate('/')
  }
  return (
    <nav className="navbar">
      <ul style={{display:'flex', flexDirection:'row', gap: '1em'}}>
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
        {!isLoggedIn && <li><Link to="/signup">Sign Up</Link></li>}
        {isLoggedIn && <li><Link to='/profile'>Profile</Link></li>}
        <li><Link to="/monuments">Monuments</Link></li>
        <li><SearchInput /></li>
        {isLoggedIn && <li><button onClick={onClickLogoutHandler}>Logout</button></li>}
      </ul>
    </nav>
  )
}

export default Navbar
