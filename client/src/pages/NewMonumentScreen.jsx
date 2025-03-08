import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import GenericMap from '../components/GenericMap'
import { useNavigate } from 'react-router-dom'
import Pin from '../components/Pin'
import { Marker } from 'react-map-gl'
import useAppStore from '../utils/AppStore'
import { GeolocateControl, NavigationControl } from 'react-map-gl'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CATEGORIES } from '../utils/constants.js'
const NewMonument = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { lat, lng } = Object.fromEntries(searchParams)
  const { user } = useAppStore()
  const [address, setAddress] = useState({
    road: '',
    house_number: '',
    city: '',
    postcode: ''
  })
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fullStreetName = `${address.road} ${address.house_number || ''}`
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true)
        const result = await axios.post(`${API_BASE_URL}/api/monuments/get-address`, {
          longitude: lng,
          latitude: lat
        })
        setAddress(result.data.data.address || 'Unknown address')
      } catch (error) {
        console.error('Error fetching address:', error)
        setAddress({ road: 'Error', house_number: '', city: '', postcode: '' })
      } finally {
        setLoading(false)
      }
    }
    fetchAddress()
  }, [lat, lng])

  const onSubmitForm = async (e) => {
    e.preventDefault()

    // Ensure all necessary data is filled
    if (!file || !name || !description) {
      toast.error('Please fill in all fields and select an image.', {
        position: 'top-right'
      })
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('latitude', lat)
    formData.append('longitude', lng)
    formData.append('userid', user?.userid)
    formData.append('image', file) // Appending the file to FormData
    formData.append('categories', categories)
    try {
      toast.info('Creating record...', { position: 'top-right' })
      const result = await axios.post(`${API_BASE_URL}/api/monuments/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(result)
      toast.success('Record created successfully!', { position: 'top-right' })
      setTimeout(() => {
        navigate('/monuments')
      }, 1500)
    } catch (error) {
      console.error('Error creating record:', error)
      toast.error('Error creating record. Please try again.', {
        position: 'top-right'
      })
    }
  }

  const handleMarkerDragEnd = useCallback((event) => {
    const { lng, lat } = event.lngLat
    setSearchParams({ lat, lng }) // Updates URL params, triggering useEffect
  }, [setSearchParams])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFile(file)
    }
  }

  const onSelectChangeHandler = (event) => {
    // Convert selected options into an array of values
    const values = Array.from(event.target.selectedOptions, (option) => option.value)
    setCategories(values)
  }


  return (
    <div style={{ display: 'flex' }}>
      <section className='content_section'>
        <form onSubmit={onSubmitForm}>
          <div>
            <label>File</label>
            <input
              type='file'
              name='file'
              required
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label>Name</label>
            <input
              type='text'
              name='name'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type='text'
              name='description'
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Road</label>
            <input name='road' disabled value={fullStreetName} />
          </div>
          <div>
            <label>City</label>
            <input name='city' disabled value={address?.city} />
          </div>
          <div>
            <label>Zip Code</label>
            <input name='postcode' disabled value={address?.postcode} />
          </div>
          <div>
            <label>Select categories</label>
            <select name="categories" id="categories" value={categories} onChange={onSelectChangeHandler} multiple>
              {CATEGORIES.map(categoryName => <option value={categoryName}>{categoryName}</option>)}
            </select>
          </div>
          
          <button type='submit' disabled={loading}>
            {loading ? 'Creating...' : 'Create Monument'}
          </button>
        </form>
      </section>
      <section className='map_section'>
        <GenericMap overrideOriginalCoordinates={{ longitude: lng, latitude: lat }}>
          <GeolocateControl position='top-left' />
          <NavigationControl position='top-left' />
          <Marker
            longitude={lng}
            latitude={lat}
            anchor='bottom'
            draggable
            onDragEnd={handleMarkerDragEnd}
          >
            <Pin number={1} />
          </Marker>
        </GenericMap>
      </section>
    </div>
  )
}

export default NewMonument
