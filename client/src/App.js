import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AppShell, Container } from '@mantine/core'
import Navbar from './components/Navbar'
import CategoriesBar from './components/CategoriesBar'
import MantineThemeProvider from './utils/MantineThemeProvider'
import Home from './pages/HomeScreen'
import Login from './pages/LoginScreen'
import UserProfile from './pages/UserProfileScreen'
import Monuments from './pages/MonumentsScreen'
import NewMonument from './pages/NewMonumentScreen'
import MonumentDetail from './pages/MonumentDetailScreen'
import SignUp from './pages/SignUpScreen'
import OTPVerification from './pages/OTPVerificationScreen'
import ApprovalScreen from './pages/ApprovalScreen'
import ProfileRedirect from './utils/ProfileRedirect'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { ToastContainer } from 'react-toastify'
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
  const shouldShowCategoriesBar =
    (location.pathname.startsWith('/monuments') && location.pathname !== '/monuments/new') || location.pathname === '/'

  return (
    <AppShell
      // navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: true } }}
      header={{ height: 110 }}
    >
      <AppShell.Header>
        <Navbar categories={categories} />
        {shouldShowCategoriesBar && <CategoriesBar categories={categories} />}
      </AppShell.Header>
      {/* <AppShell.Navbar p="md">
        
      </AppShell.Navbar> */}
      <AppShell.Main>
        <ToastContainer position='top-right' autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        {/* <Container> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
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
        {/* </Container> */}
      </AppShell.Main>
    </AppShell>
  )
}

export default App
