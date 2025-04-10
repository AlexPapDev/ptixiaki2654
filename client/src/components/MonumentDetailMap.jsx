import React from 'react'
import { Grid, Group, Image,Box } from '@mantine/core'
import { getCloudinaryUrl } from '../utils/helpers'
import GenericMap from './GenericMap'
import Pin from './Pin'
import { GeolocateControl, NavigationControl, Marker } from 'react-map-gl'
const MonumentDetailMap = ({ lat, lng }) => {
  if (!lat || !lng) return <></>
  return (
    <GenericMap overrideOriginalCoordinates={{ latitude: lat, longitude: lng }}>
      <GeolocateControl position='top-left' />
      <NavigationControl position='top-left' />
      <Marker
        latitude={lat}
        longitude={lng}
        anchor="bottom"
      >
        <Pin number={1} />
      </Marker>
    </GenericMap>
  )
}

export default MonumentDetailMap
