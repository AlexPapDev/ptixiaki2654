import React from 'react'
import { Popup } from 'react-map-gl'
const MapMarkerButton = ({popupButtonInfo, setPopupButton}) => {
  const { lng, lat } = popupButtonInfo || {}

  return (
    popupButtonInfo && <Popup
      anchor="top"
      longitude={lng}
      latitude={lat}
      onClose={() => setPopupButton(null)}
    >
      <button>Click</button>
    </Popup>
  )
}

export default MapMarkerButton