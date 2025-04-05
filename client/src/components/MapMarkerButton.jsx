import React from 'react'
import { Popup } from 'react-map-gl'
import { Button, Text, Stack } from '@mantine/core'
import { Plus } from 'lucide-react'

const MapMarkerButton = ({ popupButtonInfo, setPopupButtonInfo, onClickHandler }) => {
  const { lng, lat } = popupButtonInfo || {}

  return (
    popupButtonInfo && (
      <Popup
        anchor="top"
        longitude={lng}
        latitude={lat}
        onClose={() => setPopupButtonInfo(null)}
        closeButton={false}
        closeOnClick={false}
        className="map-popup"
      >
        <Stack spacing="xs" align="center">
          <Text size="sm" fw={500}>
            Add a new monument at this location?
          </Text>
          <Button
            size="xs"
            variant="light"
            
            leftSection={<Plus size={14} />}
            onClick={onClickHandler}
          >
            Create Monument
          </Button>
        </Stack>
      </Popup>
    )
  )
}

export default MapMarkerButton
