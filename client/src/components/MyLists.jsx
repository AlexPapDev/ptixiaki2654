import { useState, useEffect } from 'react'
import useAuthStore from '../utils/AuthStore'
import { Box, Grid, TextInput, Text, Card,  Group, Title, Button, ActionIcon } from '@mantine/core'
import { Search } from 'lucide-react'
import ListCard from './ListCard'
import useDataStore from '../utils/DataStore'
const MyLists = () => {
  const { user } = useAuthStore()
  const [lists, setLists] = useState([])
  const [tempSearchText, setTempSearchText] = useState('')
  const [searchText, setSearchText] = useState(tempSearchText)
  const [loading, setLoading] = useState(true)
  const { getUserLists } = useDataStore()
  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true)
      try {
        const lists = await getUserLists(searchText)
        debugger
        setLists(lists)
      } catch (err) {
        console.error('Error fetching my lists:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchLists()
    }
  }, [user, searchText])
  const onClickButton = async () => {
    setSearchText(tempSearchText)
  }
  return (<Box >
    <Group mt="lg" mb="md" justify="space-between">
      <Text size="lg" fw={700}>Search lists created by you</Text>
      <TextInput
        placeholder="e.g churches"
        radius="xl"
        onChange={(e) => setTempSearchText(e.target.value)}
        rightSection={
          <ActionIcon size={32} radius="lg" color="primary" variant="filled" onClick={onClickButton}>
            <Search size={20} color="white"/>
          </ActionIcon>
        }
      />
    </Group>

    <Text mb="sm">Latest lists</Text>
    <Grid>
      {lists.map(list => (<Grid.Col span={4}><ListCard list={list}/></Grid.Col>))}
    </Grid>
  </Box>)
}
export default MyLists