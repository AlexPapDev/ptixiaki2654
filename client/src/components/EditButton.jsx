import { ActionIcon} from '@mantine/core'
import { Pencil } from 'lucide-react'
const EditButton = ({onEdit}) => {
  return (
    <ActionIcon variant="outline" aria-label="Settings" >
      <Pencil size={18} onClick={onEdit}/>
    </ActionIcon>
  )
}
export default EditButton