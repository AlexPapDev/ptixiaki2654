import React from 'react';
import { useForm } from '@mantine/form';
import { Select, Textarea, Button, Stack } from '@mantine/core';

const AddMonumentEraForm = ({ availableEras, onAdd }) => {
  const form = useForm({
    initialValues: {
      eraId: '',
      eraDescription: '',
    },
    validate: {
      eraId: (value) => (value ? null : 'Please select an era'),
      eraDescription: (value) => (value ? null : 'Description is required for this era'),
    },
  });

  const handleSubmit = (values) => {
    const selectedEra = availableEras.find(era => era.eraId === parseInt(values.eraId));
    if (selectedEra) {
      onAdd({
        eraId: selectedEra.eraId,
        eraName: selectedEra.name, // Store the name for display purposes
        description: values.eraDescription,
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Select
          label="Select Era"
          placeholder="Choose an era"
          data={availableEras.map((era) => ({ value: String(era.eraId), label: era.name }))}
          {...form.getInputProps('eraId')}
        />
        <Textarea
          label="Era Specific Description"
          placeholder="Describe the monument in this era..."
          minRows={4}
          {...form.getInputProps('eraDescription')}
        />
        <Button type="submit">Add Era</Button>
      </Stack>
    </form>
  );
};

export default AddMonumentEraForm;