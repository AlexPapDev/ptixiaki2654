import { Stack, Grid, Box, Text, TextInput, Switch, Button, ActionIcon} from '@mantine/core'
import { useState } from 'react'
import { Pencil } from 'lucide-react'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const hoursPerDayDefault = [null, null, null, null, null, null, null]

const EditableStackItem = ({ day, hours, isPublic, onHoursChange, onPublicChange }) => {
  return (
    <Grid>
      <Grid.Col span={5} py="xs">
        <Text size="sm" weight={500}>{day}</Text>
      </Grid.Col>
      <Grid.Col span={7} py="xs">
        {isPublic ? (
          <Text size="sm" color="black">
            Open 24h Hours
          </Text>
        ) : (
          <TextInput
            size="sm"
            value={hours || ''}
            onChange={(event) => onHoursChange(event.currentTarget.value)}
            placeholder="e.g., 9:00 - 17:00"
          />
        )}
      </Grid.Col>
    </Grid>
  )
}

const StackItem = ({ day, hours, isPublic }) => {
  return (
    <Grid>
      <Grid.Col span={5} py="xs">
        <Text size="sm" weight={500}>{day}</Text>
      </Grid.Col>
      <Grid.Col span={7} py="xs">
        <Text size="sm" color={hours ? 'black' : 'dimmed'}>
          {isPublic 
            ? 'Open 24h Hours'
            : hours || 'Unknown'
          }
        </Text>
      </Grid.Col>
    </Grid>
  )
}

const WorkingHoursDisplay = ({ hoursPerDay = hoursPerDayDefault, isPublic = false, onEdit }) => {
  return (<Box position="relative" style={{position:'relative'}}>
    <ActionIcon variant="filled" aria-label="Settings" style={{position: "absolute", right: '5px'}}>
      <Pencil size={18} onClick={onEdit}/>
    </ActionIcon>
    <Stack>
      <Text fw={600} align="left">Working Hours</Text>
      <Switch
        label="Open 24h"
        checked={isPublic}
        mb="sm"
        disabled
      />
      {daysOfWeek.map((day, idx) => (
        <StackItem key={day} day={day} hours={hoursPerDay[idx]} isPublic={isPublic} />
      ))}
    </Stack>
  </Box>)
}

const WorkingHoursEditor = ({ initialHoursPerDay = hoursPerDayDefault, initialIsPublic = false, onSave, onCancel }) => {
  const [hoursPerDay, setHoursPerDay] = useState([...initialHoursPerDay])
  const [isPublic, setIsPublic] = useState(initialIsPublic)

  const handleHoursChange = (index, newHours) => {
    const newHoursArray = [...hoursPerDay]
    newHoursArray[index] = newHours
    setHoursPerDay(newHoursArray)
  }

  const handlePublicChange = (event) => {
    setIsPublic(event.currentTarget.checked)
    if (event.currentTarget.checked) {
      setHoursPerDay(hoursPerDayDefault)
    }
  }

  return (
    <Stack>
      <Text fw={600} align="left">Edit Working Hours</Text>
      <Switch
        label="Open 24h"
        checked={isPublic}
        onChange={handlePublicChange}
        mb="sm"
      />
      {daysOfWeek.map((day, idx) => (
        <EditableStackItem
          key={day}
          day={day}
          hours={hoursPerDay[idx]}
          isPublic={isPublic}
          onHoursChange={(newHours) => handleHoursChange(idx, newHours)}
        />
      ))}
      <Stack direction="row" justify="flex-end" mt="md">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave({ hoursPerDay, isPublic })}>Save</Button>
      </Stack>
    </Stack>
  )
}

// Example of reusing the component with state management within it
const WorkingHours = ({ initialHoursPerDay, initialIsPublic, onSave }) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = (data) => {
    onSave(data)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <>
      {!isEditing ? (
        <WorkingHoursDisplay
          hoursPerDay={initialHoursPerDay}
          isPublic={initialIsPublic}
          onEdit={handleEdit}
        />
      ) : (
        <WorkingHoursEditor
          initialHoursPerDay={initialHoursPerDay}
          initialIsPublic={initialIsPublic}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </>
  )
}

export default WorkingHours