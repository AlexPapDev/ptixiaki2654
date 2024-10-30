import React from 'react'
import { Popup } from 'react-map-gl'
const MapPopup = ({markerPopupInfo, setMarkerPopupInfo}) => {
  const { longitude, latitude, name, description, image } = markerPopupInfo || {}

  return (
    markerPopupInfo && <Popup
      anchor="top"
      longitude={longitude}
      latitude={latitude}
      onClose={() => setMarkerPopupInfo(null)}
    >
      <div>
        {name}, {description} |{' '}
      </div>
      <img width="100%" src={image} />
    </Popup>
  )
}

export default MapPopup