import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
import { Button, Text, Alert, Container, LoadingOverlay } from '@mantine/core'
import UserProfileEdit from '../components/UserProfileEdit'
import UserProfileView from '../components/UserProfileView'
import UserNotFound from '../components/UserNotFound'
import useUserStore from '../stores/domain/UserStore'
import { toast } from 'react-toastify'

const UserProfile = () => {
  const { user, isLoggedIn, updateUser } = useAuthStore()
  const { userId } = useParams()
  const [pageUser, setPageUser] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [error, setError] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(true)
  const { getUserProfile, updateUserProfile } = useUserStore()

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

  useEffect(() => {
    fetchUserProfile()
  }, [userId])

  const fetchUserProfile = async () => {
    const result = await getUserProfile(userId)
    if (result.success) {
      setPageUser(result.data)
      setError(null)
      setNotFound(false)
    } else {
      setPageUser(null)
      setError(result.error)
      setNotFound(false)
    }
    setLoading(false)
  }

  const handleUpdateProfile = async (updatedData) => {
    const result = await updateUserProfile(userId, updatedData)
    if (result.success) {
      updateUser(result.data)
      setPageUser(result.data)
      setIsEditMode(false)
      toast.success('Profile updated successfully')
    } else {
      setError(result.error)
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
        <UserProfileEdit onSave={handleUpdateProfile} user={user} updateUser={updateUser} />
      ) : (
        (isOwnProfile || pageUser) && <UserProfileView user={pageUser || user} />
      )}
    </Container>
  )
}

export default UserProfile