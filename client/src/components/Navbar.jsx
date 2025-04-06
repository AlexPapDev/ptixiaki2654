import React from 'react'
import { Image, Group, Container, Anchor } from '@mantine/core'
import SearchInput from './SearchInput'
import ProfileNav from './ProfileNav'

const Navbar = () => {
  return (
    <Container fluid px={32} pt={16} pb="md">
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
