import { useForm } from '@mantine/form'
import { Select, Textarea, Button, Stack } from '@mantine/core'

const AddMonumentEraForm = ({ availableEras, onAdd }) => {
  const form = useForm({
    initialValues: {
      eraid: '',
      name: '',
      eradescription: '',
    },
    validate: {
      eraid: (value) => (value ? null : 'Please select an era'),
      eradescription: (value) => (value ? null : 'Description is required for this era'),
    },
  });

  const handleSubmit = (values) => {
    const selectedEra = availableEras.find(era => era.eraid === parseInt(values.eraid))

    if (selectedEra) {
      onAdd({
        eraid: selectedEra.eraid,
        name: selectedEra.name, // Store the name for display purposes
        description: values.eradescription,
      })
    }
  }
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Select
          label="Select Era"
          placeholder="Choose an era"
          data={availableEras.map((era) => ({ value: String(era.eraid), label: era.name }))}
          {...form.getInputProps('eraid')}
        />
        <Textarea
          autosize
          label="Era Specific Description"
          placeholder="Describe the monument in this era..."
          minRows={8}
          maxRows={16}
          {...form.getInputProps('eradescription')}
        />
        <Button type="submit">Add Era</Button>
      </Stack>
    </form>
  );
};

export default AddMonumentEraForm;