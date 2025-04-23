import { useState } from 'react'
import { Text, Textarea, Stack, Group, Button } from '@mantine/core'
import MonumentDetailEditButton from './MonumentDetailEditButton'
import useDataStore from '../utils/DataStore'
const MonumentDetailDescription = ({ monumentId, initialDescription, onSave }) => {
  const { editMonument } = useDataStore()
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
    const result = await editMonument(monumentId, 'description', editedDescription)
    if (result.success) {
      // toast.success('Record created successfully!', { position: 'top-right' })
      // setTimeout(() => navigate('/monuments'), 1500)
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
          <Text fw={600}>{savedDescription || 'No description available.'}</Text>
          <MonumentDetailEditButton onEdit={handleEditClick} />
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

export default MonumentDetailDescription