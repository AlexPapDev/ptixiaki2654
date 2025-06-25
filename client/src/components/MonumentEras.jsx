import { useState, useEffect } from 'react' // Import useEffect
import { Breadcrumbs, Textarea, Stack, Button, Anchor, Text, Title, Group, Loader, Center } from '@mantine/core'
import EditButton from './EditButton'
import AddButtonIcon from './AddButtonIcon'
import AddMonumentEraForm from './AddMonumentEraForm'
import useEras from '../hooks/useEras'
import useDataStore from '../utils/DataStore'

const MonumentEras = ({ monumentId, initialMonumentEras = [], canEdit }) => {
  const { availableEras, loadingEras, errorEras } = useEras()
  const [monumentEras, setMonumentEras] = useState(initialMonumentEras)
  // Find the initial current era or set to null if no eras
  const [currentEraName, setCurrentEraName] = useState(initialMonumentEras[0]?.eraName || null);
  const [editedDescription, setEditedDescription] = useState(''); // New state for the textarea's value
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { addMonumentEra, updateMonumentEra } = useDataStore() // Destructure updateMonumentEra

  // Effect to update editedDescription when currentEraName or monumentEras changes
  // This ensures the textarea always shows the correct description for the selected era
  useEffect(() => {
    if (currentEraName) {
      const selectedEra = monumentEras.find(era => era.eraName === currentEraName);
      if (selectedEra) {
        setEditedDescription(selectedEra.eraMonumentDescription);
      }
    } else if (monumentEras.length > 0) {
      // If no current era selected but there are monument eras, select the first one
      setCurrentEraName(monumentEras[0].eraName);
      setEditedDescription(monumentEras[0].eraMonumentDescription);
    }
  }, [currentEraName, monumentEras]);


  const onClickSave = async () => {
    // Find the specific monument era object that is currently being edited
    const eraToUpdate = monumentEras.find(era => era.eraName === currentEraName);

    if (eraToUpdate && editedDescription !== eraToUpdate.eraMonumentDescription) {
      try {
        // Call the service to update the era description
        const response = await updateMonumentEra(eraToUpdate.id, editedDescription);

        if (response && response.status === 200) {
          // Update the local state with the new description
          setMonumentEras(prevEras =>
            prevEras.map(era =>
              era.id === eraToUpdate.id
                ? { ...era, eraMonumentDescription: editedDescription }
                : era
            )
          );
          setIsEditing(false); // Exit editing mode
        } else {
          console.error('Failed to update monument era on backend:', response);
          // Optionally, show an error message to the user
        }
      } catch (error) {
        console.error('Error saving monument era description:', error);
        // Optionally, show an error message to the user
      }
    } else {
      setIsEditing(false); // No changes or no era to update, just exit editing mode
    }
  }

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.currentTarget.value);
  }

  const items = monumentEras.sort((a, b) => a.eraOrder - b.eraOrder).map((item, index) => (
    <Anchor
      href="#"
      key={index}
      onClick={(e) => {
        e.preventDefault(); // Prevent default anchor behavior
        setCurrentEraName(item.eraName);
        if (!isEditing) { // If not currently editing, update the description displayed
             setEditedDescription(item.eraMonumentDescription);
        }
      }}
      underline={item.eraName === currentEraName ? 'always' : 'hover'}
    >
      {item.eraName}
    </Anchor>
  ))

  const erasAvailableToAdd = availableEras.filter(
    (era) => !monumentEras.some((me) => me.eraId === era.eraid)
  )
  console.log('erasAvailableToAdd', erasAvailableToAdd)

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

  // Ensure there's a selected era to display/edit
  if (monumentEras.length === 0 && !isAdding) {
    return (
      <>
        <Group style={{ position: 'relative' }} justify="space-between">
          <Title order={3}>Eras</Title>
          {canEdit && isViewing && erasAvailableToAdd.length && (
            <AddButtonIcon onClickCustom={() => setIsAdding(true)} />
          )}
        </Group>
        <Text mt="md">No eras associated with this monument yet.</Text>
        {isAdding && (
          <AddMonumentEraForm
            availableEras={erasAvailableToAdd}
            onAdd={async (newEraDetails) => {
              const response = await addMonumentEra(monumentId, newEraDetails)
              const newMonumentEraData = response.data.data
              if (newMonumentEraData && newMonumentEraData.length > 0) {
                 setMonumentEras((prev) => [...prev, ...newMonumentEraData]);
                 setCurrentEraName(newMonumentEraData[0].eraName); // Set the newly added era as current
              }
              setIsAdding(false);
            }}
            onCancel={() => setIsAdding(false)}
          />
        )}
      </>
    );
  }
  if (isAdding) {
    debugger
  }
  return (
    <>
      <Group style={{ position: 'relative' }} justify="space-between">
        <Title order={3}>Eras</Title>
        {isViewing && (
          <Group>
            {/* Only show edit if there's an era selected */}
            {currentEraName && <EditButton onEdit={() => setIsEditing(true)} />}
            {erasAvailableToAdd.length && <AddButtonIcon onClickCustom={() => setIsAdding(true)} />}
          </Group>
        )}
      </Group>

      {monumentEras.length > 0 && (
          <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
              {items}
          </Breadcrumbs>
      )}


      {isViewing && currentEraName && (
        <Text style={{ whiteSpace: 'pre-wrap' }} mt="sm">{editedDescription}</Text>
      )}

      {isAdding && (
        <AddMonumentEraForm
          // Filter out eras already associated with the monument
          availableEras={erasAvailableToAdd}
          onAdd={async (newEraDetails) => {
            const response = await addMonumentEra(monumentId, newEraDetails);
            const newMonumentEraData = response.data.data;
            if (newMonumentEraData && newMonumentEraData.length > 0) {
              setMonumentEras(newMonumentEraData)
              setCurrentEraName(newMonumentEraData[0].eraName); // Set the newly added era as current
            }
            setIsAdding(false);
          }}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {isEditing && currentEraName && ( // Only show editing if an era is selected
        <>
          <Textarea
            autosize
            label="Era Specific Description"
            placeholder="Describe the monument in this era..."
            value={editedDescription} // Bind to editedDescription state
            minRows={8}
            maxRows={16}
            onChange={handleDescriptionChange} // Call the new handler
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