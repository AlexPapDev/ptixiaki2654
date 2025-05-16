import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Divider, Textarea, Title, Radio, Group, Text, Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import useDataStore from '../utils/DataStore'
const CreateListModal = ({ id, context, close, suppressNavigate = false }) => {
  const { createList } = useDataStore()
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      listName: '',
      description: '',
      privacy: 'public', 
    },
    rules: {
      listName: (value) => value.trim().length > 0,
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
      if (!suppressNavigate) navigate(`/list/${listid}`)
      close()
    } else {
      console.log(error)
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
        <Textarea
          label="Description"
          name="description"
          placeholder="A list of my favorite things..."
          minRows={4}
          mt="sm"
          mb="md"
          {...form.getInputProps('description')}
        />
        <Radio.Group
          name="privacy"
          withAsterisk
          defaultValue="public"
          {...form.getInputProps('privacy')}
        >
          <Group mt="xs">
            <Radio value="public" label="Public" />
            <Radio value="private" label="Private" />
          </Group>
        </Radio.Group>
        <Button type="submit" mt="md">Create List</Button>
      </form>
    </Container>
  )
}

export default CreateListModal