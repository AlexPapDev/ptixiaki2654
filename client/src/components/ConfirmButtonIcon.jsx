import { ActionIcon} from '@mantine/core'
import { Check } from 'lucide-react'
const ConfirmButtonIcon = ({handleSave}) => {
  return (
    <ActionIcon onClick={handleSave} variant="light" color="green" size="sm" title="Save">
      <Check size={16} />
    </ActionIcon>
  )
}
export default ConfirmButtonIcon