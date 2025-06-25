import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ListCard from '../components/ListCard'
import { Grid, Card,Group, Image, Box, ActionIcon, Text, TextInput } from '@mantine/core'
import { Search } from 'lucide-react'

import useDataStore from '../utils/DataStore'
const DiscoverLists = ({hideSearch}) => {
  const [lists, setLists] = useState([])
  const [tempSearchText, setTempSearchText] = useState('')
  const [searchText, setSearchText] = useState(tempSearchText)
  const [loading, setLoading] = useState(true)
  const { getDiscoverLists } = useDataStore()
  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true)
      try {
        const lists = await getDiscoverLists(searchText)
        setLists(lists)
      } catch (err) {
        console.error('Error fetching my lists:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLists()

  }, [searchText])
  const onClickButton = async () => {
    setSearchText(tempSearchText)
  }
  return (<Box >
    {!hideSearch && <Group mt="lg" mb="md" justify="space-between">
      <Text size="lg" fw={700}>Search lists of other users</Text>
      <TextInput
        placeholder="e.g churches"
        radius="xl"
        rightSection={
          <ActionIcon size={32} radius="lg" color="primary" variant="filled" onClick={onClickButton}>
            <Search size={20} color="white"/>
          </ActionIcon>
        }
      />
    </Group>}

    <Text mb="sm">Latest lists</Text>
    <Grid>
      {lists?.map(list => (<Grid.Col span={4}><ListCard list={list}/></Grid.Col>))}
    </Grid>
  </Box>)
}
export default DiscoverLists