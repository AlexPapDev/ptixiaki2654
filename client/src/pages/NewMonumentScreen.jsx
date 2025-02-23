import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import GenericMap from '../components/GenericMap'
import Pin from '../components/Pin'
import {Marker} from 'react-map-gl'
import { GeolocateControl, NavigationControl } from 'react-map-gl'
import { useSearchParams } from 'react-router-dom'

const NewMonument = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const [address, setAddress] = useState({})
  // const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true)
        const result = await axios.post('http://localhost:5001/api/monuments/get-address', {
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
  
  // TODO handle submit form
  const onSubmitForm = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = formData.get('name')
    const description = formData.get('description')
    const result = await axios.post('http://localhost:5001/api/monuments/', {
      name, latitude: lat, longitude: lng, description
    })
    console.log(result)
  }

  const handleMarkerDragStart = useCallback(() => {
    // setIsDragging(true)
  }, [])

  const handleMarkerDragEnd = useCallback((event) => {
    const { lng, lat } = event.lngLat
    setSearchParams({ lat, lng }) // Updates URL params, triggering useEffect
  }, [setSearchParams])

  return (
    <div style={{display:'flex'}}>
      <form style={{width:'1200px'}} onSubmit={onSubmitForm}>
        <div>
          <label>name</label>
          <input name="name" required></input>
        </div>
        <div>
          <label>description</label>
          <input name="description" required></input>
        </div>
        <div>
          <label>road</label>
          <input name="road" disabled value={address?.road + ' '+ address?.street_number}></input>
        </div>
        <div>
          <label>city</label>
          <input name="road" disabled value={address?.city}></input>
        </div>
        <div>
          <label>zip code</label>
          <input name="road" disabled value={address?.postcode}></input>
        </div>
        <button>Create</button>
      </form>
      <GenericMap>
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        <Marker
          longitude={lng}
          latitude={lat}
          anchor="bottom"
          draggable
          onDragStart={handleMarkerDragStart}
          onDragEnd={handleMarkerDragEnd}
        >
          <Pin number={1} />
        </Marker>
      </GenericMap>
    </div>
  )
}

export default NewMonument
