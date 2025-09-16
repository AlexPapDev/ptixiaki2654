import axios from 'axios'
import useAuthStore from '../utils/AuthStore'

const useAddPhoto = (objectId, onSuccess) => {
  const { token } = useAuthStore()

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

  const addMonumentPhoto = async (files) => {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('image', file)
    })
    try {
      await axios.post(
        `${API_BASE_URL}/api/monuments/${objectId}/photos`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': true },
        }
      )
      onSuccess()
    } catch (err) {
      console.error('Failed to add monument photo:', err)
    }
  }

  const addProfilePhoto = async (files) => {
    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append('image', file)
    })
    try {
      debugger
      const result = await axios.post(
        `${API_BASE_URL}/api/users/${objectId}/add-photo`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': true },
        }
      )
      console.log(result)
      onSuccess()
    } catch (err) {
      console.error('Failed to add profile photo:', err)
    }
  }

  return { addMonumentPhoto, addProfilePhoto }
}

export default useAddPhoto