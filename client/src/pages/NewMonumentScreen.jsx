import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GenericMap from '../components/GenericMap'
import Pin from '../components/Pin'
import {Marker} from 'react-map-gl'
import { GeolocateControl, NavigationControl } from 'react-map-gl'
import { INIT_MAP_STATE, MAPBOX_ACCESS_TOKEN } from '../utils/constants'
import useAppStore from '../utils/AppStore'

const NewMonument = () => {
  const { clickedSpot } = useAppStore()
  const [markerPosition, setMarkerPosition] = useState({ ...clickedSpot });
  const [isDragging, setIsDragging] = useState(false);
  const onSubmitForm = (e) => {
    e.preventDefault()
  }

  const handleMarkerDragStart = useCallback(() => {
    setIsDragging(true);
  }, [])

  const handleMarkerDragEnd = useCallback((event) => {
    setIsDragging(false);
    setMarkerPosition({
      lng: event.lngLat.lng,
      lat: event.lngLat.lat,
    });
  }, [])

  return (
    <div style={{display:'flex'}}>
      <form style={{width:'1200px'}}>
        <div>
          <label>name</label>
          <input></input>
        </div>
        <button onClick={onSubmitForm}>Create</button>
      </form>
      <GenericMap>
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        <Marker
          longitude={markerPosition.lng}
          latitude={markerPosition.lat}
          anchor="bottom"
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
