import { Marker, GeolocateControl, NavigationControl } from 'react-map-gl'
import GenericMap from './GenericMap'
import Pin from '../components/Pin'
const NewMonumentMap = ({handleMarkerDragEnd, lat, lng}) => {
  return (<>
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
  </>)
}
export default NewMonumentMap