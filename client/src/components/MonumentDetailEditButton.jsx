import { ActionIcon} from '@mantine/core'
import { Pencil } from 'lucide-react'
const MonumentDetailEditButton = ({onEdit}) => {
  return (
    <ActionIcon variant="outline" aria-label="Settings" >
      <Pencil size={18} onClick={onEdit}/>
    </ActionIcon>
  )
}
export default MonumentDetailEditButton