import React from 'react'
import { Popup } from 'react-map-gl'
const MapMarkerButton = ({popupButtonInfo, setPopupButtonInfo, onClickHandler}) => {
  const { lng, lat } = popupButtonInfo || {}

  return (
    popupButtonInfo && <Popup
      anchor="top"
      longitude={lng}
      latitude={lat}
      onClose={() => setPopupButtonInfo(null)}
    >
      <button onClick={onClickHandler}>Click</button>
    </Popup>
  )
}

export default MapMarkerButton