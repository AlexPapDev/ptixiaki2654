

// Mantine
import { AppShell, Paper } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
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
import Lists from './pages/ListsScreen'

// Utility
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import ProfileRedirect from './utils/ProfileRedirect'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { ToastContainer } from 'react-toastify'
import useAppStore from './utils/AppStore'

// Styles
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import '@mantine/core/styles.css'
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
  const location = useLocation()
  const isMonumentsPage = (location.pathname.startsWith('/monuments') && location.pathname !== '/monuments/new') 
  const isHomePage = location.pathname === '/'
  const showCategoriesBar = isMonumentsPage || isHomePage 
  const headerHeight = showCategoriesBar ? 112 : 74
  return (
    <AppShell
      // navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: true } }}
      header={{ height: headerHeight }}
    >
      <AppShell.Header>
        <Paper shadow="sm" radius="none">
          <Navbar />
          {showCategoriesBar && <CategoriesBar hideClearFilters={isHomePage}/>}
        </Paper>
      </AppShell.Header>
      
      {/* <AppShell.Navbar p="md">
        
      </AppShell.Navbar> */}
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
