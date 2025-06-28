import { useState, useEffect } from 'react'
import { notifications } from '@mantine/notifications'
import useDataStore from '../utils/DataStore'
import PrivacyToggle from './PrivacyToggle'

const ListPrivacyHandler = ({ listId, initialIsPublic }) => {
  const [isPublic, setIsPublic] = useState(initialIsPublic)
  const [savedIsPublic, setSavedIsPublic] = useState(initialIsPublic)
  const [loading, setLoading] = useState(false)

  const { editList } = useDataStore()

  useEffect(() => {
    setIsPublic(initialIsPublic)
    setSavedIsPublic(initialIsPublic)
  }, [initialIsPublic])

  const handlePrivacyChange = async (value) => {
    const newIsPublic = value === 'public'
    const previousSavedIsPublic = savedIsPublic

    setIsPublic(newIsPublic)
    setLoading(true)

    try {
      const result = await editList(listId, 'is_public', newIsPublic)

      if (result.success) {
        setSavedIsPublic(newIsPublic)
        notifications.show({
          title: 'Success',
          message: `List set to ${newIsPublic ? 'public' : 'private'}`,
          color: 'green',
        })
      } else {
        setIsPublic(previousSavedIsPublic)
        setSavedIsPublic(previousSavedIsPublic)
        console.error('Error updating list privacy:', result.error)
        notifications.show({
          title: 'Error',
          message: result.error?.message || 'Could not update list privacy. Please try again.',
          color: 'red',
        })
      }
    } catch (error) {
      setIsPublic(previousSavedIsPublic)
      setSavedIsPublic(previousSavedIsPublic)
      console.error('An unexpected error occurred:', error)
      notifications.show({
        title: 'Error',
        message: 'An unexpected error occurred while updating privacy.',
        color: 'red',
      })
    } finally {
      setLoading(false) 
    }
  }

  return (
    <PrivacyToggle
      value={isPublic ? 'public' : 'private'}
      onChange={handlePrivacyChange} 
      disabled={loading}
      loading={loading}
    />
  )
}

export default ListPrivacyHandler