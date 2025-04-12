import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
import { Button, Text, Alert, Container, LoadingOverlay } from '@mantine/core'
import UserProfileEdit from '../components/UserProfileEdit'
import UserProfileView from '../components/UserProfileView'
import UserNotFound from '../components/UserNotFound'

const UserProfile = () => {
  const { user, isLoggedIn, updateUser } = useAuthStore()
  const { userId } = useParams()
  const [pageUser, setPageUser] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [error, setError] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

  useEffect(() => {
    if (userId) {
      // Fetch user only if userId is present in the URL and it's not the logged-in user's profile
      if (Number(userId) !== Number(user?.userid)) {
        fetchUser(userId)
      } else {
        // If it's the logged-in user's profile, reset states
        setPageUser(user) // Directly set pageUser for own profile
        setNotFound(false)
      }
    } else {
      // If no userId in URL, it's the logged-in user's profile
      setPageUser(user) // Directly set pageUser for own profile
      setNotFound(false)
    }
  }, [user, userId])


  const fetchUser = async (userId) => {
    setLoading(true)
    try {
      const result = await axios.get(`${API_BASE_URL}/api/users/`, { params: { id: userId } })
      if (result.data?.data) {
        setPageUser(result.data.data)
        setError(null)
        setNotFound(false)
      } else {
        // Handle the case where the user is not found on the server
        setPageUser(null)
        setError(null)
        setNotFound(true)
      }
    } catch (err) {
      setPageUser(null)
      setError('Failed to fetch user data. Please try again later.')
      setNotFound(false) // Reset notFound on error
    } finally {
      setLoading(false) // Set loading to false after fetching (success or error)
    }
  }

  const handleUpdate = async (updatedData) => {
    try {
      const res = await axios.patch(`${API_BASE_URL}/api/users/${userId}`, updatedData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (res?.data?.user) {
        updateUser(res.data.user)
        setPageUser(res.data.user)
        setIsEditMode(false)
        setError(null)
        return res
      } else {
        setError('Failed to update profile data.')
      }
    } catch (err) {
      setError('Failed to update profile. Please try again later.')
    }
  }

  if (!isLoggedIn()) {
    return (
      <Container>
        <Text>Log in to see this page</Text>
      </Container>
    )
  }

  if (notFound) {
    return (
      <Container>
        <UserNotFound />
      </Container>
    )
  }

  const isOwnProfile = Number(userId) === Number(user?.userid)

  return (
    <Container style={{ maxWidth: 800, margin: 'auto', position: 'relative' }}>
      <LoadingOverlay visible={loading} overlayBlur={2} /> {/* Loading overlay */}
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
        (isOwnProfile || pageUser) && <UserProfileView user={pageUser || user} />
      )}
    </Container>
  )
}

export default UserProfile