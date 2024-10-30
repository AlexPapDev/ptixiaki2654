import { useState, useRef } from 'react'
import Map, {Source, Layer} from 'react-map-gl'
// import './Navbar.css' // External CSS for navbar
const thessalonikiInitialState = {
  longitude: 22.947412,
  latitude: 40.629269,
  zoom: 12,
}

const createMarker = (lang, lat) => {
  return {type: 'Feature', geometry: {type: 'Point', coordinates: [lang, lat]}}
}
let geojsonData = {
  type: 'FeatureCollection',
  features: []
}

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
  // id: 'custom-markers',
  // type: 'symbol',
  // source: 'points',
  // layout: {
  //   'icon-image': 'custom-marker', // Reference your custom marker
  //   'icon-size': 1.5, // Scale the icon size
  //   'icon-anchor': 'bottom', // Anchor the icon by its bottom to resemble a pin
  // }
}

const populateGeoJsonData = (monuments = []) =>{
  return {
    type: 'FeatureCollection',
    features: monuments.map(monument => {
      const { longitude, latitude } = monument
      return {type: 'Feature', geometry: {type: 'Point', coordinates: [longitude, latitude]}}
    })
  }
}

const MapComp = ({monuments}) => {

  const mapRef = useRef(null)
  geojsonData = populateGeoJsonData(monuments?.data)
  const [clickedPoint, setClickedPoint] = useState({})
  const handleClick = (event) => {
    setClickedPoint(event.lngLat)
    const { features } = geojsonData
    geojsonData = {
      ...geojsonData,
      features: [ ...features, createMarker(event.lngLat.lng, event.lngLat.lat) ]
    }
  }
  const handleMapLoad = () => {
    const map = mapRef.current.getMap()
    // map.loadImage('https://st2.depositphotos.com/40263824/50603/i/450/depositphotos_506030348-stock-photo-location-point-icon-red-color.jpg', (error, image) => {
    //   if (error) throw error;
    //   if (!map.hasImage('custom-marker')) {
    //     map.addImage('custom-marker', image);
    //   }
    // })
  }
  return (
    <div style={{direction:'flex'}}>
      <Map
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoiYWxleHBhcDI2NTQiLCJhIjoiY20ybHY0OTJoMGZqNjJycXQyZ2xkcHg0NCJ9._2RgcG5-F50whsMU4b-6Ig"
        initialViewState={thessalonikiInitialState}
        style={{width: 400, height: 400}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onClick={handleClick}
        onLoad={handleMapLoad}
      >
        <Source id="my-data" type="geojson" data={geojsonData}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
      <p style={{paddingTop: '2rem'}} >{clickedPoint && `${clickedPoint.lng} - ${clickedPoint.lat}`}</p>
    </div>
  )
}

export default MapComp
