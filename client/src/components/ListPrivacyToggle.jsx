import { useState, useEffect } from 'react'
import { Radio, Group, Loader } from '@mantine/core'
import { notifications } from '@mantine/notifications' // Assuming you have Mantine Notifications installed
import useDataStore from '../utils/DataStore' // Import your DataStore

const ListPrivacyToggle = ({ listId, initialIsPublic }) => {
  const [isPublic, setIsPublic] = useState(initialIsPublic)
  const [savedIsPublic, setSavedIsPublic] = useState(initialIsPublic)
  const [loading, setLoading] = useState(false)

  const { editList } = useDataStore()

  useEffect(() => {
    setIsPublic(initialIsPublic)
    setSavedIsPublic(initialIsPublic)
  }, [initialIsPublic])

  /**
   * Handles the change event from the Radio.Group.
   * This function performs the optimistic UI update and calls the API to save the change.
   * @param {string} value - The selected value from the radio group ('public' or 'private').
   */
  const handlePrivacyChange = async (value) => {
    const newIsPublic = value === 'public'
    const previousSavedIsPublic = savedIsPublic

    setIsPublic(newIsPublic)
    setLoading(true)
    try {
      // Call the editList function from your data store
      // Assuming editList takes listId, field name, and new value
      const result = await editList(listId, 'is_public', newIsPublic)

      if (result.success) {
        // If the API call was successful, update the saved state
        setSavedIsPublic(newIsPublic)
        notifications.show({
          title: 'Success',
          message: `List set to ${newIsPublic ? 'public' : 'private'}`,
          color: 'green',
        })
      } else {
        // If the API call failed, revert the UI and saved state
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
      // Catch any unexpected errors during the API call
      setIsPublic(previousSavedIsPublic)
      setSavedIsPublic(previousSavedIsPublic)
      console.error('An unexpected error occurred:', error)
      notifications.show({
        title: 'Error',
        message: 'An unexpected error occurred while updating privacy.',
        color: 'red',
      })
    } finally {
      setLoading(false) // Hide loader regardless of success or failure
    }
  }

  return (
    <Radio.Group
      value={isPublic ? 'public' : 'private'}
      onChange={handlePrivacyChange}
      name="list-privacy-toggle"
      disabled={loading}
    >
      <Group>
        <Radio value="public" label="Public" disabled={loading} />
        <Radio value="private" label="Private" disabled={loading} />
        {loading && <Loader size="xs" ml="sm" />}
      </Group>
    </Radio.Group>
  )
}

export default ListPrivacyToggle