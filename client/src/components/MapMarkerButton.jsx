import React from 'react'
import { Popup } from 'react-map-gl'
import { Button, Text, Stack, Group } from '@mantine/core'
import { Plus } from 'lucide-react'
import useAuthStore from '../utils/AuthStore'
import useAuthModals from '../hooks/useAuthModals'

const PopUpButton = ({children, onClick, withIcon = false}) => {
  console.log(children)
  return <Button
    size="xs"
    variant="light"
    leftSection={<Plus size={14} />}
    onClick={onClick}
  >
    {children}
  </Button>
}
const MapMarkerButton = ({ popupButtonInfo, setPopupButtonInfo, onClickHandler }) => {
  const { isLoggedIn } = useAuthStore()
  const { openLoginModal, openSignUpModal } = useAuthModals()
  if (!popupButtonInfo) return <></>
  const { lng, lat } = popupButtonInfo
  
  return (
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
        {!isLoggedIn()  ? (
          <>
            <Text size="sm" fw={500}>You need to be logged in to create a monument</Text>
            <Group>
              <PopUpButton onClick={openLoginModal}>
                Login
              </PopUpButton>
              <PopUpButton onClick={openSignUpModal}>
                Signup
              </PopUpButton>
            </Group>
          </>
        ) : (
          <>
            <Text size="sm" fw={500}>
              Add a new monument at this location?
            </Text>
            <PopUpButton onClick={onClickHandler}>
              Create Monument
            </PopUpButton>
          </>
        )}
      </Stack>
    </Popup>
  )
}

export default MapMarkerButton
