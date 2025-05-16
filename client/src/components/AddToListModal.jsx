import { useState } from 'react'
import { Stack, Divider, Paper, Title, Group, Text, Button } from '@mantine/core'
import { Check } from 'lucide-react'
import useListStore from '../stores/domain/ListStore'

const ListItem = ({ name, isLast = false, addMonumentToList, listId, monumentId, hasMonument }) => {
  const [hasMonumentSt, setHasMonumentSt] = useState(hasMonument)
  const saveButtonHandler = async () => {
    const { success, error } = await addMonumentToList(listId, monumentId)
    if (success) {
      setHasMonumentSt(true)
    }
    if (error) {
      // handle error
    }
    
  }
  return (
    <>
      <Group justify="space-between">
        <Text>{name}</Text>
        <Button
          leftIcon={hasMonumentSt ? <Check size={16} /> : null}
          disabled={hasMonumentSt}
          onClick={saveButtonHandler}
        >
          {hasMonumentSt ? 'Saved' : 'Save'}
        </Button>
      </Group>
      {!isLast ? <Divider my="sm" /> : null}
    </>
  )
}

const AddToListModal = ({ lists = [], monumentId, openCreateList }) => {
  const { addMonumentToList } = useListStore()
  
  return (
    <Stack>
      <Title align="center" order={2}>
        Add to list
      </Title>
      <Paper shadow="none" radius="xs" withBorder p="sm">
        {lists.map((list, i, arr) => {
          const hasMonument = list.monuments && list.monuments.includes(Number(monumentId))
          return (
            <ListItem
              key={list.listid}
              name={list.name}
              isLast={arr.length - 1 === i}
              addMonumentToList={addMonumentToList}
              listId={list.listid}
              monumentId={monumentId}
              hasMonument={hasMonument}
            />
          )
        })}
      </Paper>
      <Button onClick={openCreateList}>Create new list</Button>
    </Stack>
  )
}

export default AddToListModal