import { useState } from 'react'
import { Title, Group, Badge, Button, MultiSelect } from '@mantine/core'
import EditButton from './EditButton'
import { CATEGORIES } from '../utils/constants'
import useDataStore from '../utils/DataStore'

const MonumentDetailCategories = ({ monumentId, initialCategories = [], canEdit }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [editing, setEditing] = useState(false);
  const [newCategories, setNewCategories] = useState(initialCategories)
  const { editMonumentCategories } = useDataStore()

  const handleEditClick = () => {
    setEditing(true)
  }

  const handleCancelClick = () => {
    setEditing(false);
    setNewCategories(categories)
  }

  const handleSaveClick = async () => {
    console.log(newCategories)
    const response = await editMonumentCategories(monumentId, newCategories)
    setCategories(newCategories)
    setEditing(false);
  }

  const handleCategoriesChange = (values) => {
    setNewCategories(values);
  }

  const availableCategories = CATEGORIES


  const renderActionButtons = (canEdit) => {
    if (editing) {
      return (
        <Group spacing="xs">
          <Button onClick={handleSaveClick} color="teal" size="xs" >Save</Button>
          <Button onClick={handleCancelClick} color="gray" size="xs">Cancel</Button>
        </Group>
      );
    }
    if (canEdit) return <EditButton onEdit={handleEditClick} />
    return null
  }

  const renderCategoriesContent = () => {
    if (editing) {
      return (
        <MultiSelect
          label="Edit Categories"
          data={availableCategories} // Replace with your actual data source
          value={newCategories}
          onChange={handleCategoriesChange}
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            // In a real application, you would likely update your availableCategories
            // and then add the new category to the newCategories state.
            const newCategory = query;
            setNewCategories((current) => [...current, newCategory]);
            // Optionally update availableCategories here
          }}
        />
      );
    }
    return (
      <Group>
        {categories && categories.map((categoryName) => (
          <Badge key={`badge-${monumentId}-${categoryName}`} size="lg" color="green">
            {categoryName}
          </Badge>
        ))}
        {categories.length === 0 && <Badge color="dimmed">No categories assigned</Badge>}
      </Group>
    )
  }

  return (
    <>
      <Group justify="space-between">
        <Title order={3} pb="sm">Categories</Title>
        {renderActionButtons(canEdit)}
      </Group>
      {renderCategoriesContent()}
    </>
  )
}
export default MonumentDetailCategories;