import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Text, Anchor, Group } from '@mantine/core'

const navLinks = [
  { link: '/monuments', label: 'Monuments' },
  { link: '/lists', label: 'Lists' },
  { link: '/articles', label: 'Articles', disabled: 'true' },
]

const NavLinks = () => {
  return (
    <Group wrap="nowrap">
      {navLinks.map((link) => (
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
    </Group>
  )
}

export default NavLinks
