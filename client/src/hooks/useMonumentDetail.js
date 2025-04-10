import { useState, useEffect } from 'react'
import axios from 'axios'

const useMonumentDetail = (monumentId) => {
  const [monument, setMonument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

  useEffect(() => {
    const fetchMonument = async () => {
      try {
        const result = await axios.get(`${API_BASE_URL}/api/monuments/${monumentId}`)
        const monumentData = result.data.data.monument
        setMonument(monumentData)
      } catch (err) {
        console.error(err)
        setError('Failed to load monument details')
      } finally {
        setLoading(false)
      }
    }

    if (monumentId) {
      fetchMonument()
    }
  }, [monumentId])

  return { monument, loading, error }
}

export default useMonumentDetail
