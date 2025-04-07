import React from 'react'
import { Button,Text,  Title, Tabs, Container } from '@mantine/core'
import { Binoculars, Library, Star } from 'lucide-react'
import useAuthStore from '../utils/AuthStore'
const ListsScreen = () => {
  const { isLoggedIn } = useAuthStore()
  const defaultValue = isLoggedIn() ? 'myLists' : 'discover'
  return (<>
    <Container mt="xl" style={{position: 'relative'}}>
      <Title mb="md" order={1}>Lists</Title>
      <Button size="xs" style={{position:'absolute', right: '15px', top: '64px'}}>Create a list</Button>
      <Tabs variant="outline" radius="xs" defaultValue={defaultValue} style={{backgroundColor:'white'}}>
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

        <Tabs.Panel value="myLists">
          Gallery tab content
        </Tabs.Panel>
      </Tabs>
    </Container>
  </>)
}

export default ListsScreen