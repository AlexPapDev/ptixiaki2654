import { ActionIcon} from '@mantine/core'
import { Pencil } from 'lucide-react'
const EditButton = ({onEdit}) => {
  return (
    <ActionIcon variant="outline" aria-label="Settings" onClick={onEdit}>
      <Pencil size={18} />
    </ActionIcon>
  )
}
export default EditButton