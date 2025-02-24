import { Children } from 'react'
import { INIT_MAP_STATE, MAPBOX_ACCESS_TOKEN } from '../utils/constants'
import { Map } from 'react-map-gl'

const GenericMap = ({
  onContextMenu = () => {},
  onMoveEnd = () => {},
  onLoad = () => {}, 
  onZoom = () => {},
  onClick = () => {},
  overrideOriginalCoordinates = {},
  mapRef,
  children,
}) => {

  const initMapState = {
    ...INIT_MAP_STATE,
    ...overrideOriginalCoordinates
  }
  return (
    <div style={{ position: "absolute", right: "0%", width: "50%", height: "100%" }}>
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={initMapState}
        style={{  position: 'absolute',
          right: '0%',
          width: '50%',
          height: '80%'
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onContextMenu={onContextMenu}
        onMoveEnd={onMoveEnd}
        onLoad={onLoad}
        onZoom={onZoom}
        onClick={onClick}
      >
        {children}
      </Map>
    </div>
  )
}
export default GenericMap