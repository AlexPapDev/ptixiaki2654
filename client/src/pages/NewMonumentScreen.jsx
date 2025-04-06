import {
  Box,
  Button,
  FileInput,
  Loader,
  MultiSelect,
  Stack,
  TextInput,
  Title,
  Group,
  Center,
  Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { Upload } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
import { toast } from 'react-toastify'
import { CATEGORIES } from '../utils/constants'
import GenericMap from '../components/GenericMap'
import { Marker, GeolocateControl, NavigationControl } from 'react-map-gl'
import Pin from '../components/Pin'

const NewMonument = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { lat, lng } = Object.fromEntries(searchParams)
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({
    road: '',
    house_number: '',
    city: '',
    postcode: ''
  })

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'
  const fullStreetName = `${address.road} ${address.house_number || ''}`

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      categories: [],
      file: null,
    },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      description: (value) => (value ? null : 'Description is required'),
      file: (value) => (value ? null : 'Image file is required'),
    }
  })

  const handleMarkerDragEnd = useCallback((event) => {
    const { lng, lat } = event.lngLat
    setSearchParams({ lat, lng }) // Update URL & re-trigger useEffect
  }, [setSearchParams])

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true)
        const res = await axios.post(`${API_BASE_URL}/api/monuments/get-address`, {
          latitude: lat,
          longitude: lng
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

  const handleSubmit = async (values) => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('latitude', lat)
    formData.append('longitude', lng)
    formData.append('userid', user?.userid)
    formData.append('image', values.file)
    formData.append('categories', values.categories)

    try {
      toast.info('Creating record...', { position: 'top-right' })
      const res = await axios.post(`${API_BASE_URL}/api/monuments/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast.success('Record created successfully!', { position: 'top-right' })
      setTimeout(() => navigate('/monuments'), 1500)
    } catch (err) {
      console.error(err)
      toast.error('Error creating record. Please try again.', { position: 'top-right' })
    }
  }

  return (
    <Group align="start" grow wrap="nowrap" >
      <Box pt="md" pl="sm" className="content_section">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Title order={3}>Create a New Monument</Title>

            <Group grow>
              <TextInput
                label="Monument Name"
                placeholder="Enter name"
                required
                {...form.getInputProps('name')}
              />
              <FileInput
                label="Upload Image"
                placeholder="Choose image file"
                icon={<Upload size={16} />}
                required
                accept="image/*"
                {...form.getInputProps('file')}
              />
            </Group>

            <Textarea
              label="Description"
              placeholder="Short description"
              required
              minRows={4}
              {...form.getInputProps('description')}
            />

            <Group grow>
              <TextInput
                label="Road"
                value={fullStreetName}
                disabled
              />

              <TextInput
                label="City"
                value={address.city}
                disabled
              />

              <TextInput
                label="Zip Code"
                value={address.postcode}
                disabled
              />
            </Group>

            

            <MultiSelect
              label="Categories"
              data={CATEGORIES}
              placeholder="Pick all that apply"
              {...form.getInputProps('categories')}
            />

            <Button type="submit" loading={loading} fullWidth>
              Create Monument
            </Button>
          </Stack>
        </form>
      </Box>

      <Box className="map_section no-categories-map-height">
        <GenericMap overrideOriginalCoordinates={{ latitude: lat, longitude: lng }}>
          <GeolocateControl position='top-left' />
          <NavigationControl position='top-left' />
          <Marker
            latitude={lat}
            longitude={lng}
            anchor="bottom"
            draggable
            onDragEnd={handleMarkerDragEnd}
          >
            <Pin number={1} />
          </Marker>
        </GenericMap>
      </Box>
    </Group>
  )
}

export default NewMonument
