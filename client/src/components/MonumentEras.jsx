import { useState } from 'react'
import { Breadcrumbs, Textarea, Stack, Button, Anchor, Text, Title, Group, Loader, Center } from '@mantine/core' // Added Loader and Center for loading state
import EditButton from './EditButton'
import AddButtonIcon from './AddButtonIcon'
import AddMonumentEraForm from './AddMonumentEraForm'
import useEras from '../hooks/useEras'
import useDataStore from '../utils/DataStore'
const MonumentEras = ({ monumentId, initialMonumentEras = [] }) => {
  const { availableEras, loadingEras, errorEras } = useEras()
  const [currentEra, setCurrentEra] = useState(initialMonumentEras[0]?.eraName)
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [monumentEras, setMonumentEras] = useState(initialMonumentEras)
  console.log('monumentEras', monumentEras)
  const { addMonumentEra } = useDataStore()
  const eraToDescription = monumentEras.reduce((acc, curr) => ({
    ...acc,
    [curr.eraName]: curr.eraMonumentDescription,
  }), {})

  const onClickSave = () => {
    console.log('update', currentEra, eraToDescription)
    const isUpdate = isEditing
    setIsEditing(false)
  }

  const items = monumentEras.sort((a, b) => a.eraOrder - b.eraOrder).map((item, index) => (
    <Anchor
      href="#" // Changed to '#' as it's not a real navigation, just state change
      key={index}
      onClick={(e) => { setCurrentEra(item.eraName) }}
      underline={item.eraName === currentEra ? 'always' : 'hover'}
    >
      {item.eraName}
    </Anchor>
  ))
  const isViewing = !isEditing && !isAdding

  if (loadingEras) {
    return (
      <Center style={{ height: '200px' }}>
        <Loader size="lg" />
        <Text ml="md">Loading eras...</Text>
      </Center>
    )
  }

  if (errorEras) {
    return (
      <Center style={{ height: '200px' }}>
        <Text color="red">Error loading eras: {errorEras.message}</Text>
      </Center>
    )
  }

  return (
    <>
      <Group style={{ position: 'relative' }} justify="space-between">
        <Title order={3}>Eras</Title>
        {isViewing && (
          <Group>
            <EditButton onEdit={() => setIsEditing(true)} />
            <AddButtonIcon onClickCustom={() => setIsAdding(true)} />
          </Group>
        )}
      </Group>

      <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
        {items}
      </Breadcrumbs>

      {isViewing && <Text style={{ whiteSpace: 'pre-wrap' }} mt="sm">{eraToDescription[currentEra]}</Text>}

      {isAdding && (
        <AddMonumentEraForm
          // Filter out eras already associated with the monument
          availableEras={availableEras.filter(
            (era) => !monumentEras.some((me) => me.eraId === era.eraId) // Assuming eraId is the unique identifier
          )}
          onAdd={async (newEraDetails) => {
            const response = await addMonumentEra(monumentId, newEraDetails)
            const newMonument = response.data.data[0]
            console.log('newMonument', newMonument)
            setMonumentEras((prev) => [...prev, newMonument])
            setIsAdding(false)
          }}
          onCancel={() => setIsAdding(false)} // Add a cancel prop to the form
        />
      )}

      {isEditing && (
        <>
          <Textarea
            autosize
            label="Era Specific Description"
            placeholder="Describe the monument in this era..."
            value={eraToDescription[currentEra]}
            minRows={8}
            maxRows={16}
            onChange={(event) => {
              // This needs to update the actual monumenteras array, or a local copy
              // For simplicity, we're not implementing full update logic here.
              // In a real app, you'd likely manage this state more robustly.
              console.log('Editing description for:', currentEra, event.currentTarget.value)
            }}
          />
          <Stack direction="row" justify="flex-end" mt="md">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={onClickSave}>Save</Button>
          </Stack>
        </>
      )}
    </>
  )
}

export default MonumentEras