import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

const useFetchList = (passedTerm, category, mapBounds) => {
  const [monuments, setMonuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async (controller) => {
    if (
      !mapBounds ||
      !mapBounds._ne || !mapBounds._sw ||
      !mapBounds._ne.lat || !mapBounds._ne.lng ||
      !mapBounds._sw.lat || !mapBounds._sw.lng
    ) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const result = await axios.get(`${API_BASE_URL}/api/lists/`, {
        signal: controller.signal,
        params: {
          query: passedTerm,
          category,
          mapBounds: {
            ne: { ...mapBounds._ne },
            sw: { ...mapBounds._sw },
          },
        },
      })
      setMonuments(result.data.data.monuments)
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled')
      } else {
        console.error('Error fetching monuments:', err)
        setError(err)
      }
    } finally {
      setLoading(false)
    }
  }, [API_BASE_URL, passedTerm, category, mapBounds])

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller)
    return () => controller.abort()
  }, [fetchData])

  return { monuments, loading, error }
}

export default useFetchList