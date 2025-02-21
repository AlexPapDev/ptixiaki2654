import { Children } from 'react'
import { INIT_MAP_STATE, MAPBOX_ACCESS_TOKEN } from '../utils/constants'
import { Map } from 'react-map-gl'

const GenericMap = ({
  onContextMenu = () => {},
  onMoveEnd = () => {},
  onLoad = () => {}, 
  onZoom = () => {},
  onClick = () => {},
  mapRef,
  children
}) => {


  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      initialViewState={INIT_MAP_STATE}
      style={{width: 400, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onContextMenu={onContextMenu}
      onMoveEnd={onMoveEnd}
      onLoad={onLoad}
      onZoom={onZoom}
      onClick={onClick}
    >
      {children}
    </Map>
  )
}
export default GenericMap