

// Mantine
import { AppShell, Modal, Paper } from '@mantine/core'
import MantineThemeProvider from './utils/MantineThemeProvider'

// Header / Navbar imports
import Navbar from './components/Navbar'
import CategoriesBar from './components/CategoriesBar'

// Screen Imports
import Home from './pages/HomeScreen'
import UserProfile from './pages/UserProfileScreen'
import Monuments from './pages/MonumentsScreen'
import NewMonument from './pages/NewMonumentScreen'
import MonumentDetail from './pages/MonumentDetailScreen'
import OTPVerification from './pages/OTPVerificationScreen'
import ApprovalScreen from './pages/ApprovalScreen'

// Utility
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import ProfileRedirect from './utils/ProfileRedirect'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { ToastContainer } from 'react-toastify'
import useAppStore from './utils/AppStore'

import SignUp from './components/SignUp'
import Login from './components/Login'

// Styles
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import '@mantine/core/styles.css'
const categories = ['Byzantine', 'Roman', 'Christian', 'Ottoman', 'Jewish', 'Neoclassical', 'Contemporary', 'UNESCO Heritage', 'Industrial']

function App() {
  return (
    <MantineThemeProvider>
      <Router>
        <MainLayout />
      </Router>
    </MantineThemeProvider>
  )
}

function MainLayout() {
  const location = useLocation()
  const { isAuthModalOpen, authMode, closeAuthModal } = useAppStore()
  const shouldShowCategoriesBar = (
    location.pathname.startsWith('/monuments') 
    && location.pathname !== '/monuments/new') 
    || location.pathname === '/'
  const headerHeight = shouldShowCategoriesBar ? 122 : 74
  return (
    <AppShell
      // navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: true } }}
      header={{ height: headerHeight }}
    >
      <AppShell.Header>
        <Paper shadow="sm">
          <Navbar categories={categories} />
          {shouldShowCategoriesBar && <CategoriesBar categories={categories} />}
        </Paper>
      </AppShell.Header>
      {/* <AppShell.Navbar p="md">
        
      </AppShell.Navbar> */}
      <AppShell.Main>
        <ToastContainer position='top-right' autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} /> */}
            <Route path='/otpverification' element={<OTPVerification />} />
            <Route path='/profile' element={<ProfileRedirect />} />
            <Route path='/monuments/new' element={<NewMonument />} />
            <Route path='/monuments' element={<Monuments />} />
            <Route path='/monuments/:monumentId' element={<MonumentDetail />} />
            <Route path='/user/:userId' element={<UserProfile />} />
            <Route path='/approval-dashboard' element={
              <ProtectedRoutes requiredRoles={['admin', 'ambassador']}>
                <ApprovalScreen />
              </ProtectedRoutes>
            } />
          </Routes>
          <Modal
            opened={isAuthModalOpen}
            onClose={closeAuthModal}
            title={authMode === 'login' ? 'Login' : 'Sign up'}
            centered
          >
            {authMode === 'login' ? <Login /> : <SignUp />}
          </Modal>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
