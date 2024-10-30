import { useState, useMemo } from 'react'
import Map, {Marker, GeolocateControl, NavigationControl } from 'react-map-gl'
// import './Navbar.css' // External CSS for navbar
import Pin from './Pin'
import MapMarkerPopup from './MapMarkerPopup'
import MapMarkerButton from './MapMarkerButton'

const mapboxAccessToken = "pk.eyJ1IjoiYWxleHBhcDI2NTQiLCJhIjoiY20ybHY0OTJoMGZqNjJycXQyZ2xkcHg0NCJ9._2RgcG5-F50whsMU4b-6Ig"
const thessalonikiInitialState = {
  longitude: 22.947412,
  latitude: 40.629269,
  zoom: 12,
}

const MapComp = ({monuments}) => {
  const [markerPopupInfo, setMarkerPopupInfo] = useState(null)
  const [popupButtonInfo, setPopupButton] = useState(false)
  const pins = useMemo(
    () =>
      monuments.data.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation()
            setMarkerPopupInfo(city)
          }}
        >
          <Pin />
        </Marker>
      )),
    [monuments.data]
  )

  const onMapRightClickHandler = (e) => {
    setPopupButton(e.lngLat)
  }

  const onMoveEndHandler = (e) => {
    // reload markers here
  }


  return (
    <div style={{direction:'flex'}}>
      <Map
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={thessalonikiInitialState}
        style={{width: 400, height: 400}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onContextMenu={onMapRightClickHandler}
        onMoveEnd={onMoveEndHandler}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        {pins}

        <MapMarkerPopup markerPopupInfo={markerPopupInfo} setMarkerPopupInfo={setMarkerPopupInfo} />
        <MapMarkerButton popupButtonInfo={popupButtonInfo} setPopupButton={setPopupButton} />       
      </Map>
    </div>
  )
}

export default MapComp
