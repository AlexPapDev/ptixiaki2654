import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const MonumentDetail = () => {
  const { monumentId } = useParams()
  const [monument, setMonument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

  useEffect(() => {
    const fetchMonument = async () => {
      try {
        setLoading(true)
        const result = await axios.get(`${API_BASE_URL}/api/monuments/${monumentId}`)
        setMonument(result.data.data.monument)
      } catch (err) {
        setError('Failed to load monument details')
      } finally {
        setLoading(false)
      }
    }

    if (monumentId) {
      fetchMonument()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monumentId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h1>{monument?.name}</h1>
      <p>{monument?.description}</p>

    </div>
  )
}

export default MonumentDetail
