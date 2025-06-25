import { ActionIcon} from '@mantine/core'
import { X } from 'lucide-react'
const CancelButtonIcon = ({onClickCustom}) => {
  return (
    <ActionIcon onClick={onClickCustom} variant="light" color="red" size="sm" title="Cancel">
      <X size={16} />
    </ActionIcon>
  )
}
export default CancelButtonIcon