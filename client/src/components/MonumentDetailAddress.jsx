import { useState } from 'react'
import { Text, Group, TextInput, Stack, Button } from '@mantine/core'

const MonumentDetailAddress = ({ initialAddress, onSave }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedAddress, setEditedAddress] = useState({ ...initialAddress })

  const handleCancelClick = () => {
    setEditedAddress({ ...initialAddress })
    setIsEditing(false)
  }
  const handleSaveClick = () => {
    onSave(editedAddress)
    setIsEditing(false)
  }
  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget
    setEditedAddress(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const road = initialAddress?.road || 'Unknown Road'
  const houseNumber = initialAddress?.house_number || ''
  const fullStreetName = `${road} ${houseNumber}`.trim()

  return (
    <div>
      {!isEditing ? (
        <Group mt="sm" mb="sm" style={{ position: 'relative' }}>
          <Text c="dimmed">{fullStreetName}</Text>
        </Group>
      ) : (
        <Stack>
          <TextInput
            label="Street Address"
            name="road"
            value={editedAddress?.road || ''}
            onChange={handleInputChange}
          />
          <TextInput
            label="House Number"
            name="house_number"
            value={editedAddress?.house_number || ''}
            onChange={handleInputChange}
          />
          <Group position="right" mt="sm">
            <Button variant="outline" size="xs" onClick={handleCancelClick}>Cancel</Button>
            <Button size="xs" onClick={handleSaveClick}>Save Address</Button>
          </Group>
        </Stack>
      )}
    </div>
  )
}

export default MonumentDetailAddress