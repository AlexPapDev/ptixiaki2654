import { Box, Group, LoadingOverlay} from '@mantine/core'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
import useDataStore from '../utils/DataStore'
import { toast } from 'react-toastify'
import useMonumentStore from '../stores/domain/MonumentStore'
import { modals } from '@mantine/modals'

import NewMonumentMap from '../components/NewMonumentMap'
import NewMonumentForm from '../components/NewMonumentForm'
import AddMonumentEraForm from '../components/AddMonumentEraForm'

import useEras from '../hooks/useEras'
const NewMonument = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { lat, lng } = Object.fromEntries(searchParams)
  const navigate = useNavigate()
  const { isLoggedIn, user } = useAuthStore()
  const { createMonument, isCreatingMonument, monumentCreationError, getEras } = useDataStore()
  const [error, setError] = useState(null)
  const { getMonumentAddress } = useMonumentStore()

  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({
    road: '',
    house_number: '',
    city: '',
    postcode: '',
  })

  const [monumentEras, setMonumentEras] = useState([])
  const { availableEras, loadingEras, errorEras } = useEras()


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
        const result = await getMonumentAddress({
          latitude: lat,
          longitude: lng,
        })
        if (result) {
          setAddress(result.data.data.address || {})
        }
      } catch (err) {
        console.error("Error fetching address:", err)
        setAddress({ road: 'Error', house_number: '', city: '', postcode: '' })
      } finally {
        setLoading(false)
      }
    };
    fetchAddress();
  }, [lat, lng, getMonumentAddress])

  useEffect(() => {
    if (monumentCreationError) {
      toast.error(`Error creating record: ${monumentCreationError}`, { position: 'top-right' })
    }
  }, [monumentCreationError])

  if (!isLoggedIn()) {
    navigate('/')
    return null
  }

  // Function to handle adding an era description via modal
  const handleAddEra = () => {
    modals.open({
      title: 'Add Era-Specific Description',
      children: (
        <AddMonumentEraForm
          availableEras={availableEras.filter(
            (era) => !monumentEras.some((me) => me.eraid === era.eraid)
          )} // Filter out eras already added
          onAdd={(newEraDetails) => {
            setMonumentEras((prev) => [...prev, newEraDetails]);
            modals.closeAll() // Close the modal after adding
          }}
        />
      ),
      centered: true,
      size: 'lg',
    })
  }

  // Function to handle removing an era description
  const handleRemoveEra = (eraIdToRemove) => {
    setMonumentEras((prev) => prev.filter((era) => era.eraId !== eraIdToRemove));
  }


  const handleSubmit = async (values) => {
    console.log('new monument screen handle submit', values)
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

    formData.append('monumentEras', JSON.stringify(monumentEras))

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
          monumentEras={monumentEras}
          onAddEra={handleAddEra}
          onRemoveEra={handleRemoveEra}
        />
      </Box>

      <Box className="map_section no-categories-map-height">
        <NewMonumentMap handleMarkerDragEnd={handleMarkerDragEnd} lat={lat} lng={lng} />
      </Box>
    </Group>
  )
}

export default NewMonument