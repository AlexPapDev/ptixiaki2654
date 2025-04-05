import { useState } from "react"
import { Menu, Button, Avatar, Divider } from "@mantine/core"
import { Menu as MenuIcon } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
export default function ProfileNav() {
  const { isLoggedIn, user, logoutUser } = useAuthStore()
  const [opened, setOpened] = useState(false)
  const loggedIn = isLoggedIn()

  const navigate = useNavigate()

  const onClickLogoutHandler = () => {
    logoutUser()
    navigate('/')
  }
  
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
        {!loggedIn && <Menu.Item component={Link} to="/login">Login</Menu.Item>}
        {!loggedIn && <Menu.Item component={Link} to="/signup">Signup</Menu.Item>}
        {loggedIn && <Menu.Item component={Link} to="/profile">Profile</Menu.Item>}
        

        {isAdminOrAmbassador && (<>
          <Divider />
          <Menu.Item component={Link} to="/approval-dashboard">Approval Dashboard</Menu.Item>
        </>)}

        
        {loggedIn && (<>
          <Divider />
          <Menu.Item onClick={onClickLogoutHandler}>Logout</Menu.Item>
        </>)}
      </Menu.Dropdown>
    </Menu>
  )
}