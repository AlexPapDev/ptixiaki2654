import React from 'react'
import { Image, Group, Container, Anchor, Text } from '@mantine/core'
import SearchInput from './SearchInput'
import ProfileNav from './ProfileNav'

const Navbar = () => {
  return (
    <Container fluid px={32} pt={16} pb="md">
      <Group justify="space-between">
        <Group gap="xs">
          <Image height={30} width={30} src="/ancient-greece.png"></Image>
          <Anchor href="/monuments" style={{ textDecoration: 'none' }}><Text size="md" fw={600}>Monuma</Text></Anchor>
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
