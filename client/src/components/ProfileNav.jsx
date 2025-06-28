import { useState } from "react"
import { Menu, Button, Avatar, Divider, Text } from "@mantine/core"
import { Menu as MenuIcon } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
import { INIT_MAP_STATE } from '../utils/constants'
import MenuItemLink from './MenuItemLink'
import useAuthModals from '../hooks/useAuthModals'

export default function ProfileNav() {
  const { isLoggedIn, getUser, logoutUser } = useAuthStore()
  const user = getUser()
  const [opened, setOpened] = useState(false)
  const loggedIn = isLoggedIn()
  const navigate = useNavigate()
  const { openLoginModal, openSignUpModal } = useAuthModals()

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
        {!loggedIn && <MenuItemLink onClick={openLoginModal}>Login</MenuItemLink>}
        {!loggedIn && <MenuItemLink onClick={openSignUpModal}>Signup</MenuItemLink>}

        {loggedIn && <MenuItemLink to="/profile">Profile</MenuItemLink>}
        {!loggedIn && <Divider />}
        <MenuItemLink to={
          loggedIn
            ? {
                pathname: "/monuments/new",
                search: `?lat=${latitude}&lng=${longitude}`,
              }
            : undefined
          }
          onClick={() => {
            if (!loggedIn) {
              openLoginModal('login')
            }
          }} >
          Create Monument
        </MenuItemLink>

        {isAdminOrAmbassador && (
          <>
            <Divider />
            <MenuItemLink to="/approval-dashboard">Approval Dashboard</MenuItemLink>
          </>
        )}

        {loggedIn && (
          <>
            <Divider />
            <MenuItemLink onClick={onClickLogoutHandler}>Logout</MenuItemLink>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
