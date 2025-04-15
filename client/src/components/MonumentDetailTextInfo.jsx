import { Stack, Text, Divider, Title, Badge, Group } from '@mantine/core'
const MonumentDetailTextInfo = ({ monument }) => {
  const { monumentid, name, description, address, images, categories } = monument
  const road = address?.road || 'Unknown Road'
  const houseNumber = address?.house_number || ''
  const fullStreetName = `${road} ${houseNumber}`.trim()
  return (
    <Stack gap="sm">
      <Text c="dimmed">{fullStreetName}</Text>
      <Text fw={600}>{monument?.description}</Text>
      <Divider />
      <Title pt="md">Categories</Title>
      <Group>
        {categories.map(categoryName => (
          <Badge key={`badge-${monumentid}-${categoryName}`} size="lg" color="green">
            {categoryName}
          </Badge>
        ))}
      </Group>
        
  </Stack>
  )
}
export default MonumentDetailTextInfo