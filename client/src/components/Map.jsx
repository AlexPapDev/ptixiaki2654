import { useState, useRef, useMemo, useCallback } from 'react'
import { GeolocateControl, NavigationControl } from 'react-map-gl'
import MapMarkerPopup from './MapMarkerPopup'
import MapMarkerButton from './MapMarkerButton'
import MapMarkers from './MapMarkers'
import GenericMap from './GenericMap'
import useAppStore from '../utils/AppStore'
import useAuthStore from '../utils/AuthStore'
import { INIT_MAP_STATE } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import Supercluster from 'supercluster'
import { Button } from '@mantine/core'
const MapComp = ({ data = [] }) => {
  const { mapBounds, setMapBounds } = useAppStore()
  const { isLoggedIn } = useAuthStore()
  const mapRef = useRef(null)
  const navigate = useNavigate()
  const [bounds, setBounds] = useState(null)
  const [markerPopupInfo, setMarkerPopupInfo] = useState(null)
  const [popupButtonInfo, setPopupButtonInfo] = useState(false)

  const supercluster = useRef(
    new Supercluster({
      radius: 40,
      maxZoom: 16,
    })
  )

  const [zoom, setZoom] = useState(INIT_MAP_STATE.zoom)

  const onMapRightClickHandler = (e) => {
    setPopupButtonInfo(e.lngLat)
  }

  const onRedoSearch = () => {
    if (bounds) setMapBounds(bounds)
  }

  // Convert data points into GeoJSON format
  const points = useMemo(() => 
    data.map((monument, i) => ({
      type: 'Feature',
      properties: { cluster: false, id: monument.monumentid },
      geometry: {
        type: 'Point',
        coordinates: [monument.longitude, monument.latitude],
      },
      data: monument,
      pointIndexId: i + 1,
    })), 
    [data]
  )

  // Compute clusters when `points`, `bounds`, or `zoom` change
  const clusters = useMemo(() => {
    if (!points.length || !bounds) return []
    
    const sw = bounds.getSouthWest()
    const ne = bounds.getNorthEast()

    supercluster.current.load(points)
    return supercluster.current.getClusters(
      [sw.lng, sw.lat, ne.lng, ne.lat],
      zoom
    )
  }, [points, bounds, zoom])

  const handleMapLoadOrMove = useCallback(() => {
    if (mapRef.current) {
      const newBounds = mapRef.current.getBounds()
      setBounds(newBounds)
      if (!mapBounds) setMapBounds(newBounds)
    }
  }, [mapBounds, setMapBounds])

  const onClickNewMonumentButton = () => {
    if (isLoggedIn()) {
      navigate({
        pathname: '/monuments/new',
        search: `?lat=${popupButtonInfo.lat}&lng=${popupButtonInfo.lng}`
      })
    }
  }

  return (
    <>
      <GenericMap
        mapRef={mapRef}
        onContextMenu={onMapRightClickHandler}
        onMoveEnd={handleMapLoadOrMove}
        onLoad={handleMapLoadOrMove}
        onZoom={(e) => setZoom(e.viewState.zoom)}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        <MapMarkers clusters={clusters} points={points} setMarkerPopupInfo={setMarkerPopupInfo} />
        <MapMarkerPopup markerPopupInfo={markerPopupInfo} setMarkerPopupInfo={setMarkerPopupInfo} />
        <MapMarkerButton onClickHandler={onClickNewMonumentButton} popupButtonInfo={popupButtonInfo} setPopupButtonInfo={setPopupButtonInfo} />
        <Button mt="xs" mr="xs" onClick={onRedoSearch} variant="outline" style={{ position: 'absolute', zIndex: 999, right: 0, backgroundColor: 'white'}}>
          Redo Search
        </Button>
       
      </GenericMap>
    </>
  )
}

export default MapComp
