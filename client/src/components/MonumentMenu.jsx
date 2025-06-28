import { Menu, ActionIcon, Divider } from '@mantine/core'
// import { DotsVerticalIcon } from '@mantine/icons'
import { EllipsisVertical } from "lucide-react"
import MenuItemLink from './MenuItemLink'

const MonumentMenu = ({ monumentId }) => {
  const wikipediaUrl = `www.google.com`
  const unescoUrl = `www.google.com`

  return (
    <ActionIcon variant="outline" radius="xl" style={{border:'none'}}>
      <Menu>
        <Menu.Target>
          <EllipsisVertical color="#808080" size={20} />
        </Menu.Target>

        <Menu.Dropdown>
          <MenuItemLink to={`/monuments/${monumentId}`} size="sm">Monument Details</MenuItemLink>
          <Divider />
          <Menu.Label>External Resources</Menu.Label>
          <MenuItemLink href={wikipediaUrl} size="sm">
            Wikipedia
          </MenuItemLink>
          <MenuItemLink href={unescoUrl} size="sm">
            Unesco
          </MenuItemLink>
        </Menu.Dropdown>
      </Menu>
    </ActionIcon> 
  )
}

export default MonumentMenu
