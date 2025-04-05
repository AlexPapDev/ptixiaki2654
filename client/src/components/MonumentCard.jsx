import React from 'react'
import { Link } from 'react-router-dom'
import { Text, Group, Card, Image, Paper, Box, Badge } from '@mantine/core'
const MonumentCard = ({ monument, selected = false }) => {
  const { monumentid, name, description, address, images, categories } = monument
  const road = address?.road || 'Unknown Road'
  const houseNumber = address?.house_number || ''
  const fullStreetName = `${road} ${houseNumber}`.trim()
  const image = images?.[0] || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000'
  const destinationUrl = `/monuments/${monumentid}`
  return (
    <Link to={destinationUrl} style={{ textDecoration: 'none' }}>
      <Card className={`monument-card ${selected ? 'selected' : ''}`} padding="md" radius="sm">
        <Card.Section mb="sm">
          <Image
            src={image}
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Text fw={600}>{name}</Text>
        <Text fw={400}>{fullStreetName}</Text>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {description}
        </Text>

        <Group mt="xs" gap="xs" style={{ height: 30 }}>
          {categories.slice(0, 3).map(categoryName => (<Badge size="sm" color="grey">{categoryName}</Badge>))}
        </Group>
      </Card>
    </Link>
  )
}

export default MonumentCard
