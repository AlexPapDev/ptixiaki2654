import { useState } from 'react'
import { Button, Input, FileInput, Text } from '@mantine/core'

const UserProfileEdit = ({ user, onSave, updateUser }) => {
  const [userState, setUserState] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  })
  const [selectedFile, setSelectedFile] = useState(null)

  const handleChange = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) setSelectedFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { firstname, lastname, email } = userState
    const formData = new FormData()
    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('email', email)

    if (selectedFile) {
      formData.append('image', selectedFile)
    }

    const res = await onSave(formData)
    const { user } = res.data
    updateUser({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      profileimageurl: user.profileimageurl,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        style={{ marginBottom: '20px' }}
        label="First Name"
        value={userState.firstname}
        onChange={handleChange}
        name="firstname"
        required
      />
      <Input
        style={{ marginBottom: '20px' }}
        label="Last Name"
        value={userState.lastname}
        onChange={handleChange}
        name="lastname"
        required
      />
      <Input
        style={{ marginBottom: '20px' }}
        label="Email"
        type="email"
        value={userState.email}
        onChange={handleChange}
        name="email"
        required
      />
      <FileInput
        label="Profile Picture"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: '20px' }}
      />
      <Button type="submit" fullWidth>
        Save Changes
      </Button>
    </form>
  )
}

export default UserProfileEdit
