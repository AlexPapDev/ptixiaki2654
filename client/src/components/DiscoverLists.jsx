import React from 'react'
import { Link } from 'react-router-dom'
import ListCard from '../components/ListCard'
import { Grid, Card,Group, Image, Box, ActionIcon, Text, TextInput } from '@mantine/core'
import { Search } from 'lucide-react'
const tempLists = [
  {
    monuments: [],
    name: 'testlist 1',
    description: 'desfkdjfdkjdkg',
    createdBy: {
      userid: '1',
      name: 'monuma',
    }
  },
  {
    monuments: [],
    name: 'testlist 2',
    description: 'asdfgkg asdfasdfasdfasdf asdfaghfagafdga asdfasfgad',
    createdBy: {
      userid: null,
      name: 'monuma'
    }
  },
]

const DiscoverLists = () => {
  const onClickButton = () => {

  }
  return (<Box >
    <Group mt="lg" mb="md" justify="space-between">
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
    </Group>

    <Text mb="sm">Latest lists</Text>
    <Grid>
      {tempLists.map(list => (<Grid.Col span={4}><ListCard list={list}/></Grid.Col>))}
    </Grid>
  </Box>)
}
export default DiscoverLists