import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import Map, {GeolocateControl, NavigationControl } from 'react-map-gl'
import MapMarkerPopup from './MapMarkerPopup'
import MapMarkerButton from './MapMarkerButton'
import MapMarkers from './MapMarkers'
import GenericMap from './GenericMap'
import useAppStore from '../utils/AppStore'
import { INIT_MAP_STATE, MAPBOX_ACCESS_TOKEN } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import Supercluster from 'supercluster';

const MapComp = ({data = []}) => {
  const { mapBounds, setMapBounds, isLoggedIn, setClickedSpot } = useAppStore()
  const mapRef = useRef(null)
  const navigate = useNavigate()
  const [bounds, setBounds] = useState({})
  const [markerPopupInfo, setMarkerPopupInfo] = useState(null)
  const [popupButtonInfo, setPopupButtonInfo] = useState(false)

  const supercluster = useRef(
    new Supercluster({
      radius: 40,
      maxZoom: 16,
    })
  )

  const [clusters, setClusters] = useState([]);
  const [zoom, setZoom] = useState(INIT_MAP_STATE.zoom)

  const onMapRightClickHandler = (e) => {
    setPopupButtonInfo(e.lngLat)
  }

  const onRedoSearch = () => {
    setMapBounds(bounds)
  }
  // Convert data points into GeoJSON format
  const points = useMemo(() => data.map((monument, i) => ({
    type: 'Feature',
    properties: { cluster: false, id: monument.monumentid },
    geometry: {
      type: 'Point',
      coordinates: [monument.longitude, monument.latitude],
    },
    data: monument,
    pointIndexId: i + 1,
  })), [data])

  useEffect(() => {
    if (!points?.length) return
    const bounds = mapRef.current.getBounds()
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    supercluster.current.load(points);
    setClusters(
      supercluster.current.getClusters(
        [sw.lng, sw.lat, ne.lng, ne.lat],
        zoom,
      )
    )
  }, [points, bounds, zoom])

  const handleMapLoadOrMove = useCallback(async () => {
    if (mapRef) {
      const bounds = mapRef.current.getBounds()
      setBounds(bounds)
      if (!mapBounds) setMapBounds(bounds)
    }
  }, [mapRef, setBounds, setMapBounds, mapBounds])

  const onClickNewMonumentButton = () => {
    if (isLoggedIn()) {
      // setClickedSpot(popupButtonInfo)
      navigate({ pathname: '/monuments/new', 
        search: `?lat=${popupButtonInfo.lat}&lng=${popupButtonInfo.lng}`
      })
    }
  }

  return (<>
    <GenericMap
      mapRef={mapRef}
      onContextMenu={onMapRightClickHandler}
      onMoveEnd={handleMapLoadOrMove}
      onLoad={handleMapLoadOrMove}
      onZoom={(e) => { setZoom(e.viewState.zoom) }}
    >
      <GeolocateControl position="top-left" />
      <NavigationControl position="top-left" />
      <MapMarkers clusters={clusters} points={points} setMarkerPopupInfo={setMarkerPopupInfo} />

      <MapMarkerPopup markerPopupInfo={markerPopupInfo} setMarkerPopupInfo={setMarkerPopupInfo} />
      <MapMarkerButton onClickHandler={onClickNewMonumentButton} popupButtonInfo={popupButtonInfo} setPopupButtonInfo={setPopupButtonInfo} />
      <button onClick={onRedoSearch} style={{position: 'absolute', zIndex: 999, right: 0}}>Redo search</button>
    </GenericMap>
    </>
  )
}

export default MapComp
