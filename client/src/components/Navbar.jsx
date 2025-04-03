import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Group, Container, Anchor } from '@mantine/core'
import SearchInput from './SearchInput'
import useAuthStore from '../utils/AuthStore'

const Navbar = () => {
  const { isLoggedIn, logoutUser, user } = useAuthStore()
  const navigate = useNavigate()
  
  const onClickLogoutHandler = () => {
    logoutUser()
    navigate('/')
  }

  const loggedIn = isLoggedIn()
  const isAdminOrAmbassador = loggedIn && (user?.role === 'admin' || user?.role === 'ambassador')

  return (
    <Container fluid px={32} py={16} style={{ backgroundColor: '#f5f5f5' }}>
      <Group position="apart" align="center">
        <Group gap="lg">
          {/* <Text size="xl" weight={700}>YourSite</Text> */}
          <Anchor href="/" color="white" style={{ textDecoration: 'none' }}>Home</Anchor>
          {!loggedIn && <Link to="/login">Login</Link>}
          {!loggedIn && <Link to="/signup">Sign Up</Link>}
          {loggedIn && <Link to="/profile">Profile</Link>}
          <Link to="/monuments">Monuments</Link>
          {isAdminOrAmbassador && <Link to="/approval-dashboard">Approval Dashboard</Link>}
        </Group>
        
        <Group gap="md" align="center">
          <SearchInput />
          {loggedIn && <Button variant="outline" onClick={onClickLogoutHandler}>Logout</Button>}
        </Group>
      </Group>
    </Container>
  )
}

export default Navbar
