import { useState } from "react"
import { Menu, Button, Avatar, Divider, Text } from "@mantine/core"
import { Menu as MenuIcon } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
import { INIT_MAP_STATE } from '../utils/constants'

// ✅ Clean, reusable component for Menu items that are links
const MenuItemLink = ({ to, children }) => (
  <Menu.Item component={Link} to={to}>
    <Text>{children}</Text>
  </Menu.Item>
)

export default function ProfileNav() {
  const { isLoggedIn, user, logoutUser } = useAuthStore()
  const [opened, setOpened] = useState(false)
  const loggedIn = isLoggedIn()
  const navigate = useNavigate()

  const onClickLogoutHandler = () => {
    logoutUser()
    navigate('/')
  }

  const { latitude, longitude } = INIT_MAP_STATE
  const isAdminOrAmbassador = loggedIn && (user?.role === 'admin' || user?.role === 'ambassador')

  return (
    <Menu opened={opened} onChange={setOpened} position="bottom-end" withArrow>
      <Menu.Target>
        <Button variant="default" radius="md" px={10} size="md">
          <MenuIcon size={20} strokeWidth={2.5} />
          <Avatar src={null} alt="Profile" size={30} ml={10} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {!loggedIn && <MenuItemLink to="/login">Login</MenuItemLink>}
        {!loggedIn && <MenuItemLink to="/signup">Signup</MenuItemLink>}

        {loggedIn && <MenuItemLink to="/profile">Profile</MenuItemLink>}

        {loggedIn && (
          <MenuItemLink to={{
            pathname: "/monuments/new",
            search: `?lat=${latitude}&lng=${longitude}`,
          }}>
            Create Monument
          </MenuItemLink>
        )}

        {isAdminOrAmbassador && (
          <>
            <Divider />
            <MenuItemLink to="/approval-dashboard">Approval Dashboard</MenuItemLink>
          </>
        )}

        {loggedIn && (
          <>
            <Divider />
            <Menu.Item onClick={onClickLogoutHandler}>
              <Text>Logout</Text>
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
