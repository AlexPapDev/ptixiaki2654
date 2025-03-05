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

const NewMonument = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { lat, lng } = Object.fromEntries(searchParams)
  const { user } = useAppStore()
  const [address, setAddress] = useState({ road: '', house_number: '', city: '', postcode: ''})

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const fullStreetName = address.road + ' ' + address.house_number
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true)
        const result = await axios.post(`${API_BASE_URL}/api/monuments/get-address`, {
          longitude: lng, latitude: lat
        })
        setAddress(result.data.data.address || 'Unknown address')
      } catch (error) {
        console.error('Error fetching address:', error)
        setAddress('Error fetching address')
      } finally {
        setLoading(false)
      }
    }

    fetchAddress()
  }, [lat, lng]) // Runs when markerPosition changes
  
  // TODO handle result?
  const onSubmitForm = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = formData.get('name')
    const description = formData.get('description')
    try {
      toast.info('Creating record...', { position: 'top-right' });
      const result = await axios.post(`${API_BASE_URL}/api/monuments/`, {
        name, latitude: lat, longitude: lng, description, userid: user?.userid
      })
      console.log(result)
      toast.success('Record created successfully!', { position: 'top-right' });
      setTimeout(() => {
        navigate('/monuments');
      }, 1500)
    } catch (error) {
      console.error('Error creating record:', error);

    // On failure, show error toast
      toast.error('Error creating record. Please try again.', {
        position: 'top-right',
      })
    }
  }

  const handleMarkerDragEnd = useCallback((event) => {
    const { lng, lat } = event.lngLat
    setSearchParams({ lat, lng }) // Updates URL params, triggering useEffect
  }, [setSearchParams])

  return (
    <div style={{display:'flex'}}>
      <section className='content_section'>

      
        <form onSubmit={onSubmitForm}>
          <div>
            <label>name</label>
            <input name='name' required></input>
          </div>
          <div>
            <label>description</label>
            <input name='description' required></input>
          </div>
          <div>
            <label>road</label>
            <input name='road' disabled value={fullStreetName}></input>
          </div>
          <div>
            <label>city</label>
            <input name='road' disabled value={address?.city}></input>
          </div>
          <div>
            <label>zip code</label>
            <input name='road' disabled value={address?.postcode}></input>
          </div>
          <button>Create</button>
        </form>
      </section>
      <section className='map_section'>
        <GenericMap overrideOriginalCoordinates={{longitude: lng, latitude: lat}}>
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
