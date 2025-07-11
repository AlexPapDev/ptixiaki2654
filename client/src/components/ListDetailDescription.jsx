import { useState } from 'react'
import { Text, Textarea, Stack, Group, Button } from '@mantine/core'
import EditButton from './EditButton'
import useDataStore from '../utils/DataStore'
const ListDetailDescription = ({ listId, initialDescription, showEdit }) => {
  const { editList } = useDataStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(initialDescription)
  const [savedDescription, setSavedDescription] = useState(initialDescription)

  const handleEditClick = () => setIsEditing(true)
  const handleCancelClick = () => {
    setEditedDescription(initialDescription)
    setIsEditing(false)
  }
  const handleSaveClick = async () => {
    // onSave(editedDescription)
    const result = await editList(listId, 'description', editedDescription)
    if (result.success) {
      // toast.success('Record created successfully!', { position: 'top-right' })
      // setTimeout(() => navigate('/Lists'), 1500)
      setSavedDescription(editedDescription)
    }
    console.log(result)
    setIsEditing(false)
  }
  const handleInputChange = (event) => {
    setEditedDescription(event.currentTarget.value)
  }

  return (
    <div>
      {!isEditing ? (
        <Group style={{ position: 'relative' }} justify="space-between">
          <Text fw={600} style={{maxWidth: '85%'}}>{savedDescription || 'No description available.'}</Text>
          {showEdit && <EditButton onEdit={handleEditClick} />}
        </Group>
      ) : (
        <Stack>
          <Textarea
            label="Description"
            value={editedDescription || ''}
            onChange={handleInputChange}
            minRows={3}
          />
          <Group position="right" mt="sm">
            <Button variant="outline" size="xs" onClick={handleCancelClick}>Cancel</Button>
            <Button color="teal" size="xs" onClick={handleSaveClick}>Save Description</Button>
          </Group>
        </Stack>
      )}
    </div>
  )
}

export default ListDetailDescription