import React from 'react'
import { Link } from 'react-router-dom'
import { Text, Menu, Anchor } from '@mantine/core'

const MenuItemLink = ({ to, href, children, onClick = () => {}, size = 'md' }) => {
  const isExternal = href && !to

  const content = (
    <Text size={size}>
      {children}
    </Text>
  )

  if (isExternal) {
    return (
      <Menu.Item>
        <Anchor href="https://www.google.com" target="_blank" underline="never">{content}</Anchor>
      </Menu.Item>
    )
  }

  if (to) {
    return (
      <Menu.Item component={Link} to={to}>
        {content}
      </Menu.Item>
    )
  }

  return (
    <Menu.Item onClick={onClick}>
      {content}
    </Menu.Item>
  )
}

export default MenuItemLink
