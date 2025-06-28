import { useState, useEffect } from 'react'
import useAuthStore from '../utils/AuthStore'
import { Box, Grid, TextInput, Text,  Group, ActionIcon } from '@mantine/core'
import { Search } from 'lucide-react'
import ListCard from './ListCard'
import useDataStore from '../utils/DataStore'
const FollowingLists = ({hideSearch = false}) => {
  const { getUser } = useAuthStore()
  const user = getUser()
  const [lists, setLists] = useState([])
  const [tempSearchText, setTempSearchText] = useState('')
  const [searchText, setSearchText] = useState(tempSearchText)
  const [loading, setLoading] = useState(true)
  const { getFollowedLists } = useDataStore()
  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true)
      try {
        const lists = await getFollowedLists(searchText)
        setLists(lists)
      } catch (err) {
        console.error('Error fetching Following lists:', err)
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
    {!hideSearch && <Group mt="lg" mb="md" justify="space-between">
      <Text size="lg" fw={700}>Search lists you are following</Text>
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
    </Group>}

    <Grid>
      {lists.map(list => (<Grid.Col span={4}><ListCard list={list}/></Grid.Col>))}
    </Grid>
  </Box>)
}
export default FollowingLists