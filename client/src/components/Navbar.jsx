import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Image, Group, Container, Text, Anchor, Box, Burger } from '@mantine/core'
import SearchInput from './SearchInput'
import ProfileNav from './ProfileNav'
import NavLinks from './NavLinks'
import NavDrawer from './NavDrawer'
import { useMediaQuery, useDisclosure } from '@mantine/hooks'
import { useMantineTheme } from '@mantine/core'
const links = [
  { link: '/monuments', label: 'Monuments' },
  { link: '/lists', label: 'Lists' },
  { link: '/articles', label: 'Articles' },
]

const Navbar = ({ isTextInputNearTop = false, toggleNavbar, navbarOpened }) => {
  // console.log('isTextInputNearTop', isTextInputNearTop)
  const theme = useMantineTheme()
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const isXlOrBigger = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)
  const isSmOrSmaller = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  const groupFlex = isXlOrBigger ? '1 0 140px' : ''
  return (
    <Container fluid px={32} pt={16} pb="md">
      <Group justify="space-between" wrap="nowrap" style={{ position: 'relative', minHeight: '42px' }}>
        <Group gap="xs" style={{flex: groupFlex}} wrap="nowrap">
          <Burger hiddenFrom="md" opened={drawerOpened} onClick={openDrawer} size="sm" mr="md" lineSize={2}></Burger>
          <Image visibleFrom="md" height={30} width={30} src="/ancient-greece.png" />
          <Box visibleFrom="md">
            <Link to="/" style={{ textDecoration: 'none' }} >
              <Text color="primary" size="md" fw={600}>
                Monuma
              </Text>
            </Link>
          </Box>
          
        </Group>

        {!isTextInputNearTop && <Box px="md" style={{
          flex: '1 0 auto',
          minWidth: !isSmOrSmaller ? '348px' : null,
          maxWidth: !isSmOrSmaller ? '500px' : null,
        }}>
          <SearchInput />
        </Box>}

        <Group visibleFrom="sm" ml={30} gap="md" justify="flex-end" wrap="nowrap" style={{flex: groupFlex}} >
          <NavLinks />
          <Box visibleFrom="md">
            <ProfileNav />
          </Box>

        </Group>
        {/* <Box hiddenFrom="md" visibleFrom="xs">
          <ProfileNav/>
        </Box> */}
        <NavDrawer drawerOpened={drawerOpened} closeDrawer={closeDrawer}/>
      </Group>
    </Container>
  )
}

export default Navbar
