import { ActionIcon} from '@mantine/core'
import { Cross } from 'lucide-react'
const AddButton = ({onClick}) => {
  return (
    <ActionIcon color="teal" variant="filled" aria-label="Settings" >
      <Cross size={18} onClick={onClick}/>
    </ActionIcon>
  )
}
export default AddButton