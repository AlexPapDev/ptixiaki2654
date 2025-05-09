import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Container, Divider, Paper, Title, Radio, Group, Text, Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import useListStore from '../stores/domain/ListStore'
const ListItem = ({name, isLast = false, addMonumentToList, listId, monumentId}) => {

  return (<>
    <Group justify="space-between">
      <Text>{name}</Text>
      <Button onClick={() => addMonumentToList(listId, monumentId)}>Save</Button>
    </Group>
    {!isLast ? <Divider my="sm"/> : null}
  </>)
}
const AddToListModal = ({ lists = [], monumentId }) => {
  // const lists = [{name: 'My liked monuments'}, {name: 'Test list'}]
  const { addMonumentToList } = useListStore()
  return (
    <Stack>
      <Title align='center' order={2}>
        Add to new list
      </Title>
      <Paper shadow="none" radius="xs" withBorder p="sm">
        {lists.map((list, i, arr) => (<ListItem name={list.name} isLast={arr.length - 1 === i} addMonumentToList={addMonumentToList} listId={list.listid} monumentId={monumentId}/>))}
      </Paper>
      <Button>Save to new list</Button>
    </Stack>
  )
}
export default AddToListModal