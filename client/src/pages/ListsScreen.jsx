import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Text, Box, Title, Tabs, Container } from '@mantine/core'
import { Binoculars, Library, Star } from 'lucide-react'
import useAuthStore from '../utils/AuthStore'
import DiscoverLists from '../components/DiscoverLists'
import FollowingLists from '../components/FollowingLists'
import MyLists from '../components/MyLists'
import CreateListButton from '../components/CreateListButton'
const ListsScreen = () => {
  const { isLoggedIn } = useAuthStore()
  const loggedIn = isLoggedIn()
  const defaultValue = loggedIn ? 'myLists' : 'discover'

  const location = useLocation()
  const navigate = useNavigate()

  const currentTab = location.pathname.split('/')[2] || 'discover'

  const handleTabChange = (value) => {
    navigate(`/lists/${value}`)
  }
  return (<>
    <Container mt="xl" style={{position: 'relative'}}>
      <Title mb="md" order={1}>Lists</Title>
      <Box style={{ position: 'absolute', right: '15px', top: '64px', zIndex: 10 }}>
        <CreateListButton loggedIn={loggedIn}/>
      </Box>
      <Tabs value={currentTab} onChange={handleTabChange} variant="outline" radius="xs" defaultValue={defaultValue} style={{backgroundColor:'white'}}>
        <Tabs.List>
          <Tabs.Tab value="discover" leftSection={<Binoculars size={12} />}>
            <Text m="xs">Discover</Text>
          </Tabs.Tab>
          <Tabs.Tab value="myLists" leftSection={<Library size={12} />} disabled={!loggedIn}>
            <Text m="xs">My Lists</Text>
          </Tabs.Tab>
          <Tabs.Tab value="following" leftSection={<Star size={12} />} disabled={!loggedIn}>
            <Text m="xs">Followed Lists</Text>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Routes>
        <Route index element={<Navigate to="discover" replace />} />
        <Route path="discover" element={<DiscoverLists />} />
        <Route path="myLists" element={<MyLists />} />
        <Route path="following" element={<FollowingLists />} />
      </Routes>
    </Container>
  </>)
}

export default ListsScreen