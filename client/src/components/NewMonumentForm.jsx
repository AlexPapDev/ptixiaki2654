import { useState } from 'react'
import { useForm } from '@mantine/form'
import { Title, Stack, Group, TextInput, Textarea, MultiSelect, Button} from '@mantine/core'
import FileDropzone from './FileDropzone'
import { CATEGORIES } from '../utils/constants'
const NewMonumentForm = ({handleSubmit, loading, address = {}, onAddEra}) => {
  const fullStreetName = `${address.road} ${address.house_number || ''}`

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      categories: [],
      files: null,
    },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      description: (value) => (value ? null : 'Description is required'),
      files: (value) => (value ? null : 'Image files is required'),
    }
  })

  const onFilesChange = (files) => {
    form.setFieldValue('files', files)
  }

  return (<>
    <Title mt="sm" order={3}>Create a New Monument</Title>
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack mb="md">
        <Group grow>
          <TextInput
            label="Monument Name"
            placeholder="Enter name"
            required
            {...form.getInputProps('name')}
          />
          
          {/* <FileInput
            label="Upload Image"
            placeholder="Choose image files"
            icon={<Upload size={16} />}
            required
            accept="image/*"
            {...form.getInputProps('files')}
          /> */}
        </Group>

        <Textarea
          label="Description"
          placeholder="Short description"
          required
          minRows={4}
          {...form.getInputProps('description')}
        />

        <Group grow>
          <TextInput
            label="Road"
            value={fullStreetName}
            disabled
          />

          <TextInput
            label="City"
            value={address.city}
            disabled
          />

          <TextInput
            label="Zip Code"
            value={address.postcode}
            disabled
          />
        </Group>

        <MultiSelect
          label="Categories"
          data={CATEGORIES}
          placeholder="Pick up to 5 that apply"
          limit={5}
          {...form.getInputProps('categories')}
        />

        <FileDropzone onFilesChange={onFilesChange} multiple></FileDropzone>

        <Button onClick={onAddEra} variant="outline" mt="sm">
          Add Era Description
        </Button>

        <Button type="submit" loading={loading} fullWidth>
          Create Monument
        </Button>
      </Stack>
    </form>
  </>)
}
export default NewMonumentForm