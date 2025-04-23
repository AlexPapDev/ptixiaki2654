import { Box, Group, LoadingOverlay} from '@mantine/core'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
import useDataStore from '../utils/DataStore'
import { toast } from 'react-toastify'

import NewMonumentMap from '../components/NewMonumentMap'
import NewMonumentForm from '../components/NewMonumentForm'

const NewMonument = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { lat, lng } = Object.fromEntries(searchParams)
  const navigate = useNavigate()
  const { isLoggedIn, user } = useAuthStore()
  const { createMonument, isCreatingMonument, monumentCreationError } = useDataStore() // Get state and action from dataStore

  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({
    road: '',
    house_number: '',
    city: '',
    postcode: '',
  })

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

  const handleMarkerDragEnd = useCallback(
    (event) => {
      const { lng: newLng, lat: newLat } = event.lngLat
      setSearchParams({ lat: newLat, lng: newLng })
    },
    [setSearchParams]
  )

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true)
        const res = await axios.post(`${API_BASE_URL}/api/monuments/get-address`, {
          latitude: lat,
          longitude: lng,
        })
        setAddress(res.data.data.address || {})
      } catch (err) {
        console.error(err)
        setAddress({ road: 'Error', house_number: '', city: '', postcode: '' })
      } finally {
        setLoading(false)
      }
    }
    fetchAddress()
  }, [lat, lng, API_BASE_URL])

  useEffect(() => {
    if (monumentCreationError) {
      toast.error(`Error creating record: ${monumentCreationError}`, { position: 'top-right' })
    }
  }, [monumentCreationError])

  if (!isLoggedIn()) {
    navigate('/')
    return null
  }

  const handleSubmit = async (values) => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('latitude', lat)
    formData.append('longitude', lng)
    formData.append('userid', user?.userid)
    for (let i = 0; i < values.files.length; i++) {
      formData.append('image', values.files[i])
    }
    formData.append('categories', values.categories)

    toast.info('Creating record...', { position: 'top-right' })
    const result = await createMonument(formData)
    if (result.success) {
      toast.success('Record created successfully!', { position: 'top-right' })
      setTimeout(() => navigate('/monuments'), 1500)
    }
  }

  return (
    <Group align="start" grow wrap="nowrap">
      <Box pt="md" pl="sm" className="content_section" pos="relative">
        <LoadingOverlay visible={isCreatingMonument} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <NewMonumentForm
          loading={loading}
          address={address}
          handleSubmit={handleSubmit}

        />
      </Box>

      <Box className="map_section no-categories-map-height">
        <NewMonumentMap handleMarkerDragEnd={handleMarkerDragEnd} lat={lat} lng={lng} />
      </Box>
    </Group>
  )
}

export default NewMonument