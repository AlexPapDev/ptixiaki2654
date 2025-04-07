import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
import { Button, Container, Paper, Text, Alert } from '@mantine/core'
import UserProfileEdit from '../components/UserProfileEdit'
import UserProfileView from '../components/UserProfileView'

const UserProfile = () => {
  // logged in user
  const { user, isLoggedIn, updateUser } = useAuthStore()
  const { userId } = useParams()
  const [pageUser, setPageUser] = useState()
  const [isEditMode, setIsEditMode] = useState(false)
  const [error, setError] = useState(null)  // For error handling

  useEffect(() => {
    if (Number(userId) !== Number(user?.userid)) fetchUser(userId)
  }, [user, userId])

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

  // Fetch user data with error handling
  const fetchUser = async (userId) => {
    try {
      const result = await axios.get(`${API_BASE_URL}/api/users/`, { params: { id: userId } })
      setPageUser(result.data.data)
      setError(null) // Reset error if fetch is successful
    } catch (err) {
      setError('Failed to fetch user data. Please try again later.')
    }
  }

  // Handle the profile update with error handling
  const handleUpdate = async (updatedData) => {
    try {
      const res = await axios.patch(`${API_BASE_URL}/api/users/${userId}`, updatedData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setPageUser(res?.data?.user)
      setIsEditMode(false) // Exit edit mode after updating
      setError(null) // Reset error after successful update
      return res
    } catch (err) {
      setError('Failed to update profile. Please try again later.')
    }
  }

  if (!isLoggedIn()) return <Text>Log in to see this page</Text>

  const renderedUser = pageUser || user
  const isOwnProfile = Number(userId) === Number(user?.userid)

  return (
      <Paper style={{ maxWidth: 800, margin: 'auto' }}>
        {error && (
          <Alert title="Error" color="red" style={{ marginBottom: '20px' }}>
            {error}
          </Alert>
        )}

        {isOwnProfile && (
          <Button onClick={() => setIsEditMode(!isEditMode)} style={{ marginBottom: '20px' }}>
            {isEditMode ? 'Cancel' : 'Edit Profile'}
          </Button>
        )}

        {isEditMode ? (
          <UserProfileEdit onSave={handleUpdate} user={user} updateUser={updateUser} />
        ) : (
          <UserProfileView user={renderedUser} />
        )}
      </Paper>
  )
}

export default UserProfile
