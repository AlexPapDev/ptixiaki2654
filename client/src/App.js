import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import CategoriesBar from './components/CategoriesBar'
import Home from './pages/HomeScreen'
import Login from './pages/LoginScreen'
import UserProfile from './pages/UserProfileScreen'
import Monuments from './pages/MonumentsScreen'
import ProfileRedirect from './utils/ProfileRedirect'
import NewMonument from './pages/NewMonumentScreen'
import SignUp from './pages/SignUpScreen'
import OTPVerification from './pages/OTPVerificationScreen'

import { ToastContainer } from 'react-toastify'

// TODO take from backend
const categories = [
  'Byzantine', 'Roman', 'Christian', 'Ottoman', 'Jewish', 'Neoclassical', 'Contemporary', 'UNESCO Heritage', 'Industrial'
]

function App() {
  return (
    <Router>
      <MainLayout categories={categories} />
    </Router>
  )
}

// Separate component to handle layout logic
function MainLayout({ categories }) {
  const location = useLocation()

  // Show CategoriesBar only on '/' (home) and '/monuments' (excluding '/monuments/new')
  const shouldShowCategoriesBar =
    location.pathname.startsWith('/monuments') && location.pathname !== '/monuments/new' || location.pathname === '/';

  return (
    <div className='App'>
      {/* Global navigation bar */}
      <Navbar categories={categories} />

      {/* Conditionally render CategoriesBar */}
      {shouldShowCategoriesBar && <CategoriesBar categories={categories} />}

      <ToastContainer position='top-right' autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <Routes>
        <Route path='/' element={<Home />} /> {/* Home page */}
        <Route path='/login' element={<Login />} /> {/* Login page */}
        <Route path='/signup' element={<SignUp />} /> {/* Signup page */}
        <Route path='/otpverification' element={<OTPVerification />} /> {/* OTP verification */}
        <Route path='/profile' element={<ProfileRedirect />} /> {/* Profile redirect */}
        <Route path='/monuments/new' element={<NewMonument />} /> {/* New monument page */}
        <Route path='/monuments' element={<Monuments />} /> {/* Monuments page */}
        <Route path='/user/:userId' element={<UserProfile />} /> {/* User profile */}
      </Routes>
    </div>
  )
}

export default App
