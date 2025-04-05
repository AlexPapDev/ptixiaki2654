import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image, Group, Container, Anchor } from '@mantine/core'
import SearchInput from './SearchInput'
import useAuthStore from '../utils/AuthStore'
import ProfileNav from './ProfileNav'

const Navbar = () => {
  const { isLoggedIn, logoutUser, user } = useAuthStore()
  const navigate = useNavigate()
  
  const onClickLogoutHandler = () => {
    logoutUser()
    navigate('/')
  }

  const loggedIn = isLoggedIn()

  return (
    <Container fluid px={32} pt={16} pb={2}>
      <Group justify="space-between">
        <Group gap="xs">
          <Image height={30} src="/ancient-greece.png"></Image>
          <Anchor href="/monuments" style={{ textDecoration: 'none' }}>Monuma</Anchor>
        </Group>
        
        <Group gap="md" align="center">
          <SearchInput />
        </Group>

        <ProfileNav />
      </Group>
    </Container>
  )
}

export default Navbar
