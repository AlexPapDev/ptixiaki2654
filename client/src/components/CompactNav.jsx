import React from 'react'
import { Box, Group, Menu, Button } from '@mantine/core'
import NavLinks from './NavLinks'
import MenuItemLink from './MenuItemLink'
import { CATEGORIES } from '../utils/constants'
const CategoriesBar = ({hideClearFilters}) => {

  return (
    <Group p="md" align="center" justify="center">
      <NavLinks/>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button>Categories</Button>
        </Menu.Target>

        <Menu.Dropdown>
          {CATEGORIES.map(category => (
            // TODO: put the appropriate urls, they are wrong now
            <MenuItemLink key={category} to={`/monuments/${category}`} size="sm">{category}</MenuItemLink>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}

export default CategoriesBar
