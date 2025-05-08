import useAuthStore from '../utils/AuthStore'
import { Button, Group, FileButton } from '@mantine/core'
import { Bookmark, Share, Camera, Trash2 } from 'lucide-react'
import AddImagesButton from './AddImagesButton'
import AddToListButton from './AddToListButton'
const MonumentDetailActions = ({handleDelete, handleAddPhoto, loggedIn = false}) => {
  return (<Group>
    <AddToListButton />
    {/* <Button color="teal" leftSection={<Bookmark size={14} />}>Save</Button> */}
    <AddImagesButton onChange={handleAddPhoto}/>
    <Button variant="outline" leftSection={<Share size={14} />}>Share</Button>
    {loggedIn && <>
      <Button leftSection={<Trash2 size={14} />} color="red" onClick={handleDelete}>Delete</Button>
    </>}
  </Group>)
}
export default MonumentDetailActions