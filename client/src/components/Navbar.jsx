import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Group, Container, Anchor, Text } from '@mantine/core'
import SearchInput from './SearchInput'
import ProfileNav from './ProfileNav'

const Navbar = () => {
  return (
    <Container fluid px={32} pt={16} pb="md">
      <Group justify="space-between">
        <Group gap="xs">
          <Image height={30} width={30} src="/ancient-greece.png"></Image>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Text color='primary' size="md" fw={600}>Monuma</Text>
          </Link>
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
