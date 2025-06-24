import { useState } from 'react'
import { Text, Title, Stack, Group, Button } from '@mantine/core'
import EditButton from './EditButton'
import useDataStore from '../utils/DataStore'
const ListDetailTitle = ({ monumentId, initialTitle, onSave, showEdit = false }) => {
  const { editList } = useDataStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(initialTitle)
  const [savedTitle, setSavedTitle] = useState(initialTitle)

  const handleEditClick = () => {
    setIsEditing(true)
  }
  const handleCancelClick = () => {
    setEditedTitle(initialTitle)
    setIsEditing(false)
  }
  const handleSaveClick = async () => {
    // onSave(editedTitle)
    const result = await editList(monumentId, 'Title', editedTitle)
    if (result.success) {
      // toast.success('Record created successfully!', { position: 'top-right' })
      // setTimeout(() => navigate('/monuments'), 1500)
      setSavedTitle(editedTitle)
    }
    console.log(result)
    setIsEditing(false)
  }
  const handleInputChange = (event) => {
    setEditedTitle(event.currentTarget.value)
  }
  return (
    <div>
      {!isEditing ? (
        <Group style={{ position: 'relative' }} justify="space-between">
          <Title fw={600} style={{maxWidth: '85%'}}>{savedTitle || 'No Title available.'}</Title>
          {showEdit && <EditButton onEdit={handleEditClick} />}
        </Group>
      ) : (
        <Stack>
          <Text
            label="Title"
            value={editedTitle || ''}
            onChange={handleInputChange}
          />
          <Group position="right" mt="sm">
            <Button variant="outline" size="xs" onClick={handleCancelClick}>Cancel</Button>
            <Button color="teal" size="xs" onClick={handleSaveClick}>Save Title</Button>
          </Group>
        </Stack>
      )}
    </div>
  )
}

export default ListDetailTitle