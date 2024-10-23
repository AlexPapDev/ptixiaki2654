import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'
function App() {
  return (
    <Router>
      <div className="App">
        {/* Global navigation bar */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />                     {/* Home page */}
          <Route path="/login" element={<Login />} />               {/* Login page */}
          <Route path="/profile" element={<UserProfile />} />               {/* Login page */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
