import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Group, Container, Text, Anchor, Box, Burger } from '@mantine/core'
import SearchInput from './SearchInput'
import ProfileNav from './ProfileNav'
import NavLinks from './NavLinks'
import { useMediaQuery } from '@mantine/hooks'
const links = [
  { link: '/monuments', label: 'Monuments' },
  { link: '/lists', label: 'Lists' },
  { link: '/articles', label: 'Articles' },
]

const Navbar = () => {
  const matches = useMediaQuery('(min-width: 90em)')
  console.log('matches', matches)
  const groupFlex = matches ? '1 0 140px' : ''
  return (
    <Container fluid px={32} pt={16} pb="md">
      <Group justify="space-between" wrap="nowrap" style={{ position: 'relative', minHeight: '42px' }}>
        <Group gap="xs" style={{flex: groupFlex}} wrap="nowrap">
          <Burger hiddenFrom="md" size="sm" mr="md" lineSize={2}></Burger>
          <Image visibleFrom="md" height={30} width={30} src="/ancient-greece.png" />
          <Box visibleFrom="md">
            <Link to="/" style={{ textDecoration: 'none' }} >
              <Text color="primary" size="md" fw={600}>
                Monuma
              </Text>
            </Link>
          </Box>
          
        </Group>

        {/* This is the part that will be absolutely positioned */}
        <Box px="md" style={{
          flex: '1 0 auto',
          minWidth: '348px',
          maxWidth: '500px'
        }}>
          <SearchInput />
        </Box>

        <Group visibleFrom="sm" ml={30} gap="md" justify="flex-end" style={{flex: groupFlex}} >
          <NavLinks />
          <Box visibleFrom="md">
            <ProfileNav />
          </Box>

        </Group>
        {/* <Box hiddenFrom="md" visibleFrom="xs">
          <ProfileNav/>
        </Box> */}
      </Group>
    </Container>
  )
}

export default Navbar
