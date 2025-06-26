import React from 'react'
import { Container, Group, Button, Paper, UnstyledButton, Text } from '@mantine/core'
const TabButton = ({children, size = 'md', isActive = false, onClick = () => {}, Icon, disabled}) => {
  const textClassNames = `tab-button ${isActive && 'selected'}`
  return (
    <UnstyledButton
      size="sm"
      onClick={onClick}
      disabled={disabled}
    >
      <Group className={textClassNames} gap="xs">
        {Icon && <Icon size={16}></Icon>}
        <Text
          size={size}
          // className={textClassNames}
        >
          {children}
        </Text>
      </Group>
    </UnstyledButton>
  )
}
export default TabButton