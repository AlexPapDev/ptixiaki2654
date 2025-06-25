// App.js (inside MainLayout function)
import { useState, useContext } from 'react' // Import useContext
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

// Import ScrollProvider and ScrollContext
import { ScrollProvider, ScrollContext } from './contexts/ScrollContext'; // Adjust path if needed

function App() {
  return (
    <MantineThemeProvider>
      <Router>
        <ModalsProvider>
          <ScrollProvider threshold={120}> {/* You can adjust this global threshold if needed */}
            <MainLayout />
          </ScrollProvider>
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
  const { mainScrollRef, textInputTopOffset, scrollPosition, isScrolledPastThreshold } = useContext(ScrollContext);
  const showCategoriesBar = isBiggerThanMd && (isMonumentsPage || isHomePage)
  const headerHeight = showCategoriesBar ? 112 : 74

  const showNavLinks = !isBiggerThanSm && (isMonumentsPage || isHomePage)

  // Now you can use textInputTopOffset and scrollPosition here to react in MainLayout or pass down to Navbar
  // Example: Log when the TextInput is within 50px of the viewport top
  const isTextInputNearTop = textInputTopOffset !== null && (textInputTopOffset - scrollPosition <= 100);

  // You can pass this 'isTextInputNearTop' state to your Navbar component
  // or trigger other changes here based on the condition.
  // For example, if Navbar needs to know:
  // <Navbar navbarOpened={navbarOpened} toggleNavbar={() => setNavbarOpened((o) => !o)} isTextInputNearTop={isTextInputNearTop} />

  // Optional: Console log for demonstration
  // useEffect(() => {
  //   if (isTextInputNearTop) {
  //     console.log('TextInput is 50px or less from the top of AppShell.Main viewport!');
  //   } else {
  //     console.log('TextInput is NOT near the top.');
  //   }
  // }, [isTextInputNearTop]);


  return (
    <AppShell
      header={{ height: headerHeight }}
    >
      <AppShell.Header>
        <Paper shadow="sm" radius="none">
          <Navbar navbarOpened={navbarOpened} toggleNavbar={() => setNavbarOpened((o) => !o)} isTextInputNearTop={!isScrolledPastThreshold} isHomePage={isHomePage}/>
          {showCategoriesBar && <CategoriesBar hideClearFilters={isHomePage}/>}
          {showNavLinks && <CompactNav />}
        </Paper>
      </AppShell.Header>
      
      {/* Attach the mainScrollRef to AppShell.Main and ensure it's scrollable */}
      <AppShell.Main
        ref={mainScrollRef} // Attach the ref here
        style={{
          backgroundColor: '#fff',
          overflowY: 'auto', // Make sure this area is scrollable
          height: 'calc(100vh - var(--app-shell-header-height, 0px))', // Ensure it takes full height to be scrollable
        }}
      >
        <ToastContainer position='top-right' autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/otpverification' element={<OTPVerification />} />
            <Route path='/profile' element={<ProfileRedirect />} />
            <Route path='/monuments/new' element={<NewMonument />} />
            <Route path='/monuments' element={<Monuments />} />
            <Route path='/monuments/:monumentId' element={<MonumentDetail />} />
            <Route path='/user/:userId' element={<UserProfile />} />
            <Route path='/lists/*' element={<Lists />}  />
            <Route path='/list/:listId' element={<ListDetail />}  />
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