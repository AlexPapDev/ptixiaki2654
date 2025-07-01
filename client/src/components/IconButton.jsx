import { ActionIcon } from '@mantine/core'

const IconButton = ({ Icon, color = 'gray', size = 'sm', title, onClick, ...props }) => (
  <ActionIcon onClick={onClick} variant="light" color={color} size={size} title={title} {...props}>
    <Icon size={16} />
  </ActionIcon>
)

export default IconButton 