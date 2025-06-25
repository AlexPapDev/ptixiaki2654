import { useNavigate } from 'react-router-dom'
import { Container, Textarea, Title, Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import useDataStore from '../utils/DataStore'
import PrivacyToggle from './PrivacyToggle'

const CreateListModal = ({ close, suppressNavigate = false }) => {
  const { createList } = useDataStore()
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      listName: '',
      description: '',
      privacy: 'public',
    },
    validate: {
      listName: (value) => (value.trim().length > 0 ? null : 'List name cannot be empty'),
    },
  })

  const handleSubmit = async (values) => {
    console.log('Creating list with:', values)
    const dataPayload = {
      isPublic: values.privacy === 'public',
      name: values.listName,
      description: values.description,
    }

    const { success, error, data } = await createList(dataPayload)
    if (success) {
      const { listid } = data 
      if (!suppressNavigate) {
        navigate(`/list/${listid}`)
      }
      close()
    } else {
      console.error('Failed to create list:', error)
    }
  }

  return (
    <Container size={420} mb={20}>
      <Title align='center' order={2}>New List</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="List Name"
          name="listName"
          placeholder="My Awesome List"
          required
          {...form.getInputProps('listName')}
        />
        {form.errors.listName && <div style={{ color: 'red', fontSize: '0.8em', marginTop: '-10px', marginBottom: '10px' }}>{form.errors.listName}</div>}

        <Textarea
          label="Description"
          name="description"
          placeholder="A list of my favorite things..."
          minRows={4}
          mt="sm"
          mb="md"
          {...form.getInputProps('description')}
        />

        <PrivacyToggle
          value={form.values.privacy}
          onChange={(value) => form.setFieldValue('privacy', value)}
        />
        <Button type="submit" mt="md">Create List</Button>
      </form>
    </Container>
  )
}

export default CreateListModal