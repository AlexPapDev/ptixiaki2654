import { ActionIcon} from '@mantine/core'
import { Cross } from 'lucide-react'
const AddButtonIcon = ({onClickCustom}) => {
  return (
    <ActionIcon onClick={onClickCustom} variant="outline" color="green" size="md" title="Save" >
      <Cross size={18} />
    </ActionIcon>
  )
}
export default AddButtonIcon