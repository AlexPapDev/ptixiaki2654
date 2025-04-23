import { useState } from 'react'
import { Title, Group, Badge } from '@mantine/core'
import MonumentDetailEditButton from './MonumentDetailEditButton'
const MonumentDetailCategories = ({ monumentid, initialCategories = [], onSave }) => {
  const [categories, setCategories] = useState(initialCategories)

  return (<>
    <Group justify="space-between">
      <Title pb="sm">Categories</Title>
      <MonumentDetailEditButton />
    </Group>
    
    <Group>
      {categories && categories.map(categoryName => (
        <Badge key={`badge-${monumentid}-${categoryName}`} size="lg" color="green">
          {categoryName}
        </Badge>
      ))}
    </Group>
  </>)
}

export default MonumentDetailCategories