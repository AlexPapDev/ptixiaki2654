import IconButton from './IconButton'
import { Pencil } from 'lucide-react'

const EditButton = ({ onEdit }) => {
  return (
    <IconButton Icon={Pencil} color="blue" size="sm" title="Edit" onClick={onEdit} />
  )
}

export default EditButton