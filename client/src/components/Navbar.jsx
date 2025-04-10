import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Group, Container, Text, Anchor, Box } from '@mantine/core'
import SearchInput from './SearchInput'
import ProfileNav from './ProfileNav'

const links = [
  { link: '/monuments', label: 'Monuments' },
  { link: '/lists', label: 'Lists' },
  { link: '/articles', label: 'Articles' },
]

const Navbar = () => {
  return (
    <Container fluid px={32} pt={16} pb="md">
      <Group justify="space-between" style={{ position: 'relative', minHeight: '42px' }}>
        <Group gap="xs" visibleFrom="md">
          <Image height={30} width={30} src="/ancient-greece.png" />
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Text color="primary" size="md" fw={600}>
              Monuma
            </Text>
          </Link>
        </Group>

        {/* This is the part that will be absolutely positioned */}
        <Box style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          <SearchInput />
        </Box>

        <Group ml={50} gap="md" visibleFrom="lg">
          {links.map((link) => (
            <Box
              key={link.label}
              sx={{
                backgroundColor: 'red',
                padding: '8px',
                borderRadius: '4px',
              }}
            >
              <Anchor component={Link} to={link.link}>
                <Text>{link.label}</Text>
              </Anchor>
            </Box>
          ))}
          <ProfileNav />
        </Group>
      </Group>
    </Container>
  )
}

export default Navbar
