import IconButton from './IconButton'
import { X } from 'lucide-react'

const CancelButtonIcon = ({ onClickCustom }) => {
  return (
    <IconButton Icon={X} color="red" size="sm" title="Cancel" onClick={onClickCustom} />
  )
}

export default CancelButtonIcon