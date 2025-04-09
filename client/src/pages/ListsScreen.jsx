import React from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button,Text,  Title, Tabs, Container } from '@mantine/core'
import { Binoculars, Library, Star } from 'lucide-react'
import useAuthStore from '../utils/AuthStore'
import DiscoverLists from '../components/DiscoverLists'
import FollowingLists from '../components/FollowingLists'
import MyLists from '../components/MyLists'
const ListsScreen = () => {
  const { isLoggedIn } = useAuthStore()
  const defaultValue = isLoggedIn() ? 'myLists' : 'discover'

  const location = useLocation()
  const navigate = useNavigate()

  // Determine current tab
  const currentTab = location.pathname.split('/')[2] || 'discover'

  const handleTabChange = (value) => {
    navigate(`/lists/${value}`)
  }
  return (<>
    <Container mt="xl" style={{position: 'relative'}}>
      <Title mb="md" order={1}>Lists</Title>
      <Button size="xs" style={{position:'absolute', right: '15px', top: '64px'}}>Create a list</Button>
      <Tabs value={currentTab} onChange={handleTabChange} variant="outline" radius="xs" defaultValue={defaultValue} style={{backgroundColor:'white'}}>
        <Tabs.List>
          <Tabs.Tab value="discover" leftSection={<Binoculars size={12} />}>
            <Text m="xs">Discover</Text>
          </Tabs.Tab>
          <Tabs.Tab value="myLists" leftSection={<Library size={12} />} disabled={!isLoggedIn()}>
            <Text m="xs">My Lists</Text>
          </Tabs.Tab>
          <Tabs.Tab value="liked" leftSection={<Star size={12} />}>
            <Text m="xs">
              Liked Lists
            </Text>
          </Tabs.Tab>
        </Tabs.List>
      {/* </Container> */}
        {/* <Tabs.Panel value="discover">
          Find lists 
        </Tabs.Panel>
        <Tabs.Panel value="myLists">
          Gallery tab content
        </Tabs.Panel>
        <Tabs.Panel value="liked">
          Liked lists
        </Tabs.Panel> */}
      </Tabs>
      <Routes>
          {/* <Route index element={<Navigate to="discover" replace />} /> */}
          <Route path="discover" element={<DiscoverLists />} />
          <Route path="mine" element={<MyLists />} />
          <Route path="following" element={<FollowingLists />} />
        </Routes>
    </Container>
  </>)
}

export default ListsScreen