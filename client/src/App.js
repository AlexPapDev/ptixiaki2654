import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/HomeScreen'
import Login from './pages/LoginScreen'
import UserProfile from './pages/UserProfileScreen'
import Monuments from './pages/MonumentsScreen'
import ProfileRedirect from './utils/ProfileRedirect'
import NewMonument from './pages/NewMonumentScreen'
function App() {
  return (
    <Router>
      <div className="App">
        {/* Global navigation bar */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />                                       {/* Home page */}
          <Route path="/login" element={<Login />} />{/* Login page */}
          <Route path="/profile" element={<ProfileRedirect/>} />{/* Login page */}
          <Route path="/monuments/new" element={<NewMonument />} />                         Login page
          <Route path="/monuments/" element={<Monuments />} />                         {/* Login page */}
          <Route path="/user/:userId" element={<UserProfile />} />                         {/* Login page */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
