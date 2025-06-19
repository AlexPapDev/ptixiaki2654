import React, { useState, useEffect } from 'react'
import { Button, Text, Box, LoadingOverlay } from '@mantine/core' // Added Text, Box, LoadingOverlay for feedback
import { Heart, X } from 'lucide-react' // Added X for unfollow icon (or keep Heart)
import useDataStore from '../utils/DataStore' // Adjust path as needed
import { notifications } from '@mantine/notifications' // For nice toast notifications
import useAuthModals from '../hooks/useAuthModals'
import useAuthStore from '../utils/AuthStore'
const FollowListButton = ({ listId, isInitiallyFollowing = false }) => {
  const { followList, unfollowList } = useDataStore()
  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing)
  const [isLoading, setIsLoading] = useState(false)
  const { openLoginModal, } = useAuthModals()
  const { isLoggedIn } = useAuthStore()
  useEffect(() => {
    setIsFollowing(isInitiallyFollowing)
  }, [isInitiallyFollowing])


  const onFollowListHandler = async () => {
    if (!isLoggedIn()) return openLoginModal()
  
    setIsLoading(true)
    const res = await followList(listId)
    
    if (res.success) {
      setIsFollowing(true) // Update local state
      notifications.show({
        title: 'Success',
        message: res.message || 'List followed successfully!',
        color: 'teal',
      })
      console.log('Followed list successfully:', res.data)
    } else {
      notifications.show({
        title: 'Error',
        message: res.error || 'Failed to follow list. Please try again.',
        color: 'red',
      })
      console.error('Error following list:', res.error)
    }
    setIsLoading(false)
  }

  const onUnfollowListHandler = async () => {
    setIsLoading(true)

    const res = await unfollowList(listId)

    if (res.success) {
      setIsFollowing(false) // Update local state
      notifications.show({
        title: 'Success',
        message: res.message || 'List unfollowed successfully!',
        color: 'teal',
      })
      console.log('Unfollowed list successfully')
    } else {
      // setError(res.error || 'Failed to unfollow list.') // Set error state if not using notifications
      notifications.show({
        title: 'Error',
        message: res.error || 'Failed to unfollow list. Please try again.',
        color: 'red',
      })
      console.error('Error unfollowing list:', res.error)
    }
    setIsLoading(false)
  }

  return (
    <Box pos="relative">
      {isLoading && <LoadingOverlay visible />}

      {isFollowing ? (
        <Button 
          color="gray" // A different color to indicate already followed
          leftSection={<X size={14} />} // Or a filled Heart, or a different icon
          onClick={onUnfollowListHandler}
          disabled={isLoading}
        >
          Unfollow List
        </Button>
      ) : (
        <Button 
          color="teal" 
          leftSection={<Heart size={14} />} 
          onClick={onFollowListHandler}
          disabled={isLoading}
        >
          Follow List
        </Button>
      )}

      {/* If you wanted to show errors/success messages directly in the component, uncomment: */}
      {/* {error && <Text c="red" mt="xs">{error}</Text>} */}
      {/* {successMessage && <Text c="green" mt="xs">{successMessage}</Text>} */}
    </Box>
  )
}

export default FollowListButton