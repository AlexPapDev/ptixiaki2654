import React from 'react'
import { Popup } from 'react-map-gl'
import { Card, Image, Text} from '@mantine/core'
import { getCloudinaryUrl } from '../utils/helpers'
import { DEFAULT_IMAGE } from '../utils/constants'
const MapMarkerPopup = ({markerPopupInfo, setMarkerPopupInfo}) => {
  const { longitude, latitude, name, description, images, main_image_url } = markerPopupInfo || {}
  const url = getCloudinaryUrl(images?.[0] || main_image_url, { width: 300 })

  return (
    markerPopupInfo && <Popup
      anchor="top"
      longitude={longitude}
      latitude={latitude}
      maxWidth="500"
      style={{width: '180px'}}
      onClose={() => setMarkerPopupInfo(null)}
    >
      <Card radius="xs" padding="none">
        <Card.Section>
          <Image
            src={url}
            height={100}
            fit="cover"
            alt="Norway"
            fallbackSrc={DEFAULT_IMAGE}
          />
        </Card.Section>
        <Text fw={600} mt="sm">{name}</Text>
        <Text size="sm" c="dimmed" lineClamp={3} style={{ minHeight: '60px' }}>
          {description}
        </Text>
      </Card>
    </Popup>
  )
}

export default MapMarkerPopup