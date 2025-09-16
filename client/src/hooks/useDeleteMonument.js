import axios from 'axios'
import useAuthStore from '../utils/AuthStore'
import useConfirmModal from './useConfirmModal'
import { Text } from '@mantine/core'
import { DEFAULT_BACKEND_ENDOINT } from '../utils/constants'
const useDeleteMonument = (monumentId, onSuccess) => {
  const { token } = useAuthStore()
  const { openConfirm } = useConfirmModal()
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || DEFAULT_BACKEND_ENDOINT

  const deleteMonument = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/monuments/${monumentId}`, {
        headers: { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': true },
      })
      onSuccess()
    } catch (err) {
      console.error('Failed to delete monument:', err)
      alert('Delete failed. Please try again.')
    }
  }

  const handleDeleteClick = () => {
    openConfirm({
      title: 'Delete Monument',
      message: 'Are you sure you want to delete this monument? This action cannot be undone.',
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      onConfirm: deleteMonument,
      children: (
        <Text size="sm">
          {'Are you sure you want to delete this monument? This action cannot be undone.'}
        </Text>
      )
    })
  }

  return { handleDeleteClick }
}

export default useDeleteMonument
