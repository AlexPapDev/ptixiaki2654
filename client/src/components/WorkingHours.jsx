import { Stack, Grid, Box, Text, TextInput, Switch, Button, Title, Group } from '@mantine/core'
import { useState, useEffect } from 'react'
import EditButton from './EditButton'
import useDataStore from '../utils/DataStore' // Adjust path as needed

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const initialHoursState = Array(7).fill({
  open_time: null,
  close_time: null,
  is_open_24_hours: false,
  is_closed: true,
})

const EditableStackItem = ({ day, hour, index, isPublic, onHourChange }) => {
  const formattedOpenHour = hour.open_time?.slice(0, 5)
  const formattedCloseHour = hour.close_time?.slice(0, 5)

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
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                size="xs"
                label="Open"
                type="time"
                value={formattedOpenHour || ''}
                onChange={(event) => onHourChange(index, { ...hour, open_time: event.currentTarget.value })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                size="xs"
                label="Close"
                type="time"
                value={formattedCloseHour || ''}
                onChange={(event) => onHourChange(index, { ...hour, close_time: event.currentTarget.value })}
              />
            </Grid.Col>
          </Grid>
        )}
      </Grid.Col>
    </Grid>
  )
}

const StackItem = ({ day, hour }) => {
  const formattedHours = hour && !hour.is_open_24_hours && !hour.is_closed
    ? `${hour?.open_time?.slice(0, 5) || 'Unknown'} - ${hour?.close_time?.slice(0, 5) || 'Unknown'}`
    : null

  return (
    <Grid>
      <Grid.Col span={5} py="xs">
        <Text size="sm" weight={500}>{day}</Text>
      </Grid.Col>
      <Grid.Col span={7} py="xs">
        <Text size="sm" color={hour && (!hour?.is_closed || hour?.is_open_24_hours) ? 'black' : 'dimmed'}>
          {hour?.is_open_24_hours
            ? 'Open 24h Hours'
            : hour?.is_closed
              ? 'Closed'
              : formattedHours || 'Unknown'}
        </Text>
      </Grid.Col>
    </Grid>
  )
}

const WorkingHoursDisplay = ({ hoursData, onEdit, canEdit }) => {
  return (
    <Box position="relative" style={{ position: 'relative' }}>
      <Stack>
        <Group justify="space-between">
          <Title order={3} align="left">Working Hours</Title>
          {canEdit && <EditButton onEdit={onEdit} style={{ position: 'absolute', right: '5px' }} />}
        </Group>
        <Switch
          label="Open 24h"
          checked={hoursData?.some(h => h.is_open_24_hours)}
          mb="sm"
          disabled
        />
        {daysOfWeek.map((day, idx) => (
          <StackItem key={day} day={day} hour={hoursData?.[idx]} />
        ))}
      </Stack>
    </Box>
  )
}

const WorkingHoursEditor = ({ initialHoursData, onSave, onCancel }) => {
  const [hoursData, setHoursData] = useState(initialHoursData || [...initialHoursState])
  const [isPublic, setIsPublic] = useState(initialHoursData?.some(h => h.is_open_24_hours) || false)

  useEffect(() => {
    if (isPublic) {
      setHoursData(hoursData.map(h => ({ ...h, open_time: null, close_time: null, is_open_24_hours: true, is_closed: false })))
    } else {
      setHoursData(hoursData.map(h => ({ ...h, is_open_24_hours: false })))
    }
  }, [isPublic])

  const handleHourChange = (index, newHour) => {
    const newHoursArray = [...hoursData]
    newHoursArray[index] = newHour
    setHoursData(newHoursArray)
  }

  const handlePublicChange = (event) => {
    setIsPublic(event.currentTarget.checked)
  }

  const formatHoursForBackend = () => {
    return daysOfWeek.map((_, index) => ({
      day_of_week: index,
      open_time: hoursData[index]?.open_time || null,
      close_time: hoursData[index]?.close_time || null,
      is_open_24_hours: isPublic,
      is_closed: !isPublic && !hoursData[index]?.open_time && !hoursData[index]?.close_time,
    }))
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
          index={idx}
          hour={hoursData[idx]}
          isPublic={isPublic}
          onHourChange={handleHourChange}
        />
      ))}
      <Stack direction="row" justify="flex-end" mt="md">
        <Button size="xs" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button size="xs" color="teal" onClick={() => onSave(formatHoursForBackend())}>Save</Button>
      </Stack>
    </Stack>
  )
}

const WorkingHours = ({ monumentId, initialHours, canEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { updateMonumentWorkingHours } = useDataStore()
  const [currentHours, setCurrentHours] = useState(initialHours || [...initialHoursState])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async (formattedHours) => {
    const result = await updateMonumentWorkingHours(monumentId, formattedHours)
    if (result.success) {
      setCurrentHours(formattedHours.map(h => ({
        open_time: h.open_time,
        close_time: h.close_time,
        is_open_24_hours: h.is_open_24_hours,
        is_closed: h.is_closed,
      })))
      setIsEditing(false)
    } else {
      // Handle error (e.g., display a notification)
      console.error('Failed to save working hours:', result.error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <>
      {!isEditing ? (
        <WorkingHoursDisplay hoursData={currentHours} onEdit={handleEdit} canEdit={canEdit} />
      ) : (
        <WorkingHoursEditor
          initialHoursData={currentHours}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </>
  )
}

export default WorkingHours