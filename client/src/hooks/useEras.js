import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useDataStore from '../utils/DataStore'

const useEras = () => {
  const { getEras } = useDataStore()
  const [availableEras, setAvailableEras] = useState([])
  const [loadingEras, setLoadingEras] = useState(true)
  const [errorEras, setErrorEras] = useState(null)

  useEffect(() => {
    const fetchEras = async () => {
      try {
        setLoadingEras(true)
        setErrorEras(null)
        const response = await getEras()
        if (!response.data) {
          throw new Error('Failed to fetch eras')
        }
        setAvailableEras(response.data)
      } catch (err) {
        console.error('Error fetching eras:', err)
        setErrorEras(err)
        toast.error('Failed to load eras. Please try again.', { position: 'top-right' })
      } finally {
        setLoadingEras(false)
      }
    }
    fetchEras()
  }, [getEras])

  return { availableEras, loadingEras, errorEras }
}

export default useEras