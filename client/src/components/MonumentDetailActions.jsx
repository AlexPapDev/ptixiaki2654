import { Button, Group } from '@mantine/core'
import { Share, Trash2 } from 'lucide-react'
import AddImagesButton from './AddImagesButton'
import AddToListButton from './AddToListButton'
const MonumentDetailActions = ({handleDelete, handleAddPhoto, loggedIn = false, monumentId}) => {
  return (<Group pt="lg" pb="sm">
    <AddToListButton monumentId={monumentId}/>
    {loggedIn && <AddImagesButton onChange={handleAddPhoto}/>}
    <Button variant="outline" leftSection={<Share size={14} />}>Share</Button>
    {loggedIn && <Button leftSection={<Trash2 size={14} />} color="red" onClick={handleDelete}>Delete</Button>}
  </Group>)
}
export default MonumentDetailActions