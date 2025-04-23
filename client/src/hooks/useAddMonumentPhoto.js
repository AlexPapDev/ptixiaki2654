import axios from 'axios'
import useAuthStore from '../utils/AuthStore'

const useAddMonumentPhoto = (monumentId, onSuccess) => {
  const { token } = useAuthStore()

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

  const handleAddPhoto = async (files) => {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('image', file)
    })
    try {
      await axios.post(
        `${API_BASE_URL}/api/monuments/${monumentId}/photos`, 
        formData,
        {
        headers: { Authorization: `Bearer ${token}` },
      })
      onSuccess()
    } catch (err) {
      console.error('Failed to add monument photo:', err)
    }
  }

  return { handleAddPhoto }
}

export default useAddMonumentPhoto
