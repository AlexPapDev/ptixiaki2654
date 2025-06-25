import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
import { Button, Box, Text, Alert, Container, LoadingOverlay } from '@mantine/core'
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

  useEffect(() => {
    fetchUserProfile()
  }, [userId])

  const fetchUserProfile = async () => {
    const result = await getUserProfile(userId)
    if (result.success) {
      setPageUser(result.data.data)
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
      updateUser(result.data.data)
      setPageUser(result.data.data)
      setIsEditMode(false)
      toast.success('Profile updated successfully')
    } else {
      setError(result.error)
    }
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
    <Box >
      <LoadingOverlay visible={loading} /> {/* Loading overlay */}
      {error && (
        <Alert title="Error" color="red" style={{ marginBottom: '20px' }}>
          {error}
        </Alert>
      )}
{/* 
      {isOwnProfile && (
        <Button onClick={() => setIsEditMode(!isEditMode)} style={{ marginBottom: '20px' }}>
          {isEditMode ? 'Cancel' : 'Edit Profile'}
        </Button>
      )} */}

      {isEditMode ? (
        <UserProfileEdit onSave={handleUpdateProfile} user={user} updateUser={updateUser} />
      ) : (
        (isOwnProfile || pageUser) && <UserProfileView user={pageUser || user} />
      )}
    </Box>
  )
}

export default UserProfile