import logo from './logo.svg'
import { useState, useContext, createContext } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/HomeScreen'
import Login from './pages/LoginScreen'
import UserProfile from './pages/UserProfileScreen'
import Monuments from './pages/MonumentsScreen'

function App() {
  return (
    <Router>
      <div className="App">
        {/* Global navigation bar */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />                                       {/* Home page */}
          <Route path="/login" element={<Login />} />{/* Login page */}
          <Route path="/profile" element={<UserProfile/>} />{/* Login page */}
          <Route path="/monuments" element={<Monuments />} />                         {/* Login page */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
