import { useState } from 'react'
import { FileButton, Button } from '@mantine/core'
import { Camera } from 'lucide-react'
const AddImagesButton = ({onChange}) => {
  return (
    <FileButton onChange={onChange} accept="image/png,image/jpeg" multiple>
      {(buttonProps) => <Button {...buttonProps} variant="outline" leftSection={<Camera size={14}/>} >Add Photo</Button>}
    </FileButton>
  )
}
export default AddImagesButton