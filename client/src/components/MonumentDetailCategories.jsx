import { useState } from 'react'
import { Title, Group, Badge, Button, MultiSelect } from '@mantine/core'
import EditButton from './EditButton'
import { CATEGORIES } from '../utils/constants'
import useDataStore from '../utils/DataStore'
const MonumentDetailCategories = ({ monumentId, initialCategories = [], onSave }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [editing, setEditing] = useState(false);
  const [newCategories, setNewCategories] = useState(initialCategories); // To hold the edited categories
  const { editMonumentCategories } = useDataStore()
  const handleEditClick = () => {
    setEditing(true)
  };

  const handleCancelClick = () => {
    setEditing(false);
    setNewCategories(categories)
  };

  const handleSaveClick = async () => {
    console.log(newCategories)
    const response = await editMonumentCategories(monumentId, newCategories)
    // onSave(newCategories); // Call the onSave prop with the updated categories
    setCategories(newCategories)
    setEditing(false);
  };

  const handleCategoriesChange = (values) => {
    setNewCategories(values);
  };

  // Assuming you have a way to fetch all available categories
  const availableCategories = CATEGORIES

  return (
    <>
      <Group justify="space-between">
        <Title pb="sm">Categories</Title>
        {!editing ? (
          <EditButton onEdit={handleEditClick} />
        ) : (
          <Group spacing="xs">
            <Button onClick={handleSaveClick} size="sm">Save</Button>
            <Button onClick={handleCancelClick} color="gray" size="sm">Cancel</Button>
          </Group>
        )}
      </Group>

      {editing ? (
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
      ) : (
        <Group>
          {categories && categories.map((categoryName) => (
            <Badge key={`badge-${monumentId}-${categoryName}`} size="lg" color="green">
              {categoryName}
            </Badge>
          ))}
          {categories.length === 0 && <Badge color="dimmed">No categories assigned</Badge>}
        </Group>
      )}
    </>
  );
};

export default MonumentDetailCategories;