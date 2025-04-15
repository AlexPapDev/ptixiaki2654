import { useState } from 'react'

// Mantine
import { AppShell, Paper } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { useMediaQuery } from '@mantine/hooks'
import MantineThemeProvider from './utils/MantineThemeProvider'

// Header / Navbar imports
import Navbar from './components/Navbar'
import CategoriesBar from './components/CategoriesBar'
import CompactNav from './components/CompactNav'

// Screen Imports
import Home from './pages/HomeScreen'
import UserProfile from './pages/UserProfileScreen'
import Monuments from './pages/MonumentsScreen'
import NewMonument from './pages/NewMonumentScreen'
import MonumentDetail from './pages/MonumentDetailScreen'
import OTPVerification from './pages/OTPVerificationScreen'
import ApprovalScreen from './pages/ApprovalScreen'
import Lists from './pages/ListsScreen'
import ListDetail from './pages/ListDetailScreen'

// Utility
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import ProfileRedirect from './utils/ProfileRedirect'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { ToastContainer } from 'react-toastify'

// Styles
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
function App() {
  return (
    <MantineThemeProvider>
      <Router>
        <ModalsProvider>
          <MainLayout />
        </ModalsProvider>
      </Router>
    </MantineThemeProvider>
  )
}

function MainLayout() {
  const [navbarOpened, setNavbarOpened] = useState(false)
  const location = useLocation()
  const isBiggerThanMd = useMediaQuery('(min-width: 64em)')
  const isBiggerThanSm = useMediaQuery('(min-width: 48em)')
  const isMonumentsPage = (location.pathname.startsWith('/monuments') && location.pathname !== '/monuments/new') 
  const isHomePage = location.pathname === '/'

  const showCategoriesBar = isBiggerThanMd && (isMonumentsPage || isHomePage)
  const headerHeight = showCategoriesBar ? 112 : 74

  const showNavLinks = !isBiggerThanSm && (isMonumentsPage || isHomePage)
  return (
    <AppShell
      // navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: true } }}
      header={{ height: headerHeight }}
    >
      <AppShell.Header>
        <Paper shadow="sm" radius="none">
          <Navbar navbarOpened={navbarOpened} toggleNavbar={() => setNavbarOpened((o) => !o)} />
          {showCategoriesBar && <CategoriesBar hideClearFilters={isHomePage}/>}
          {showNavLinks && <CompactNav />}
        </Paper>
      </AppShell.Header>
      
      {/* <AppShell.Main style={{backgroundColor: '#f8f9fa'}}> */}
      <AppShell.Main style={{backgroundColor: '#fff'}}>
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
            <Route path='/lists/*' element={<Lists />}  />
            <Route path='/list/*' element={<ListDetail />}  />
            <Route path='/approval-dashboard' element={
              <ProtectedRoutes requiredRoles={['admin', 'ambassador']}>
                <ApprovalScreen />
              </ProtectedRoutes>
            } />
          </Routes>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
