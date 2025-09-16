import { useState, useEffect } from 'react'
import axios from 'axios'
import { DEFAULT_BACKEND_ENDOINT } from '../utils/constants'
const useListDetail = (listId) => {
  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || DEFAULT_BACKEND_ENDOINT

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        const result = await axios.get(`${API_BASE_URL}/api/lists/${listId}`, {
          headers: { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': true },
        })
        const listData = result.data
        setList(listData)
      } catch (err) {
        console.error(err)
        setError('Failed to load monument details')
      } finally {
        setLoading(false)
      }
    }

    if (listId) {
      fetchList()
    }
  }, [listId])

  return { list, loading, error }
}

export default useListDetail
