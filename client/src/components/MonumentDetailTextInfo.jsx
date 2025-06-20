import { Stack, Text, Divider, Title, Badge, Box, Group, TextInput, Textarea, Button } from '@mantine/core'
import { useState } from 'react'
import EditButton from './EditButton'

// --- Address Section ---

const AddressDisplay = ({ address, onEdit }) => {
  const road = address?.road || 'Unknown Road';
  const houseNumber = address?.house_number || '';
  const fullStreetName = `${road} ${houseNumber}`.trim();

  return (
    <Group style={{position:'relative'}}>
      <Text c="dimmed">{fullStreetName}</Text>
      <EditButton onEdit={onEdit}/>
    </Group>
  )
}

const AddressEdit = ({ address, onSave, onCancel }) => {
  const [editedAddress, setEditedAddress] = useState({ ...address });

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setEditedAddress(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
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
        <Button variant="outline" size="xs" onClick={onCancel}>Cancel</Button>
        <Button size="xs" onClick={() => onSave(editedAddress)}>Save Address</Button>
      </Group>
    </Stack>
  );
};

// --- Description Section ---

const DescriptionDisplay = ({ description, onEdit }) => (
  <div>
    <Text fw={600}>{description || 'No description available.'}</Text>
    {onEdit && <Button size="xs" mt="xs" onClick={onEdit}>Edit Description</Button>}
  </div>
);

const DescriptionEdit = ({ description, onSave, onCancel }) => {
  const [editedDescription, setEditedDescription] = useState(description);

  return (
    <Stack>
      <Textarea
        label="Description"
        value={editedDescription || ''}
        onChange={(event) => setEditedDescription(event.currentTarget.value)}
        minRows={3}
      />
      <Group position="right" mt="sm">
        <Button variant="outline" size="xs" onClick={onCancel}>Cancel</Button>
        <Button size="xs" onClick={() => onSave(editedDescription)}>Save Description</Button>
      </Group>
    </Stack>
  );
};

// --- Main Editable Component ---

const EditableMonumentDetailTextInfoGranular = ({ initialMonument, onAddressSave, onDescriptionSave }) => {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [currentMonument, setCurrentMonument] = useState({ ...initialMonument });

  const handleEditAddress = () => setIsEditingAddress(true);
  const handleCancelAddressEdit = () => setIsEditingAddress(false);
  const handleSaveAddress = (updatedAddress) => {
    onAddressSave(updatedAddress);
    setCurrentMonument(prev => ({ ...prev, address: updatedAddress }));
    setIsEditingAddress(false);
  };

  const handleEditDescription = () => setIsEditingDescription(true);
  const handleCancelDescriptionEdit = () => setIsEditingDescription(false);
  const handleSaveDescription = (updatedDescription) => {
    onDescriptionSave(updatedDescription);
    setCurrentMonument(prev => ({ ...prev, description: updatedDescription }));
    setIsEditingDescription(false);
  };

  const { monumentid, name, description, address, categories } = currentMonument;

  return (
    <Stack gap="sm">
      {isEditingAddress ? (
        <AddressEdit address={currentMonument.address} onSave={handleSaveAddress} onCancel={handleCancelAddressEdit} />
      ) : (
        <AddressDisplay address={currentMonument.address} onEdit={handleEditAddress} />
      )}

      {isEditingDescription ? (
        <DescriptionEdit description={currentMonument.description} onSave={handleSaveDescription} onCancel={handleCancelDescriptionEdit} />
      ) : (
        <DescriptionDisplay description={currentMonument.description} onEdit={handleEditDescription} />
      )}

      <Divider />
      <Title pt="md">Categories</Title>
      <Group>
        {categories && categories.map(categoryName => (
          <Badge key={`badge-${monumentid}-${categoryName}`} size="lg" color="green">
            {categoryName}
          </Badge>
        ))}
      </Group>
    </Stack>
  );
};

export default EditableMonumentDetailTextInfoGranular