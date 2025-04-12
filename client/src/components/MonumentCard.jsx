import React from 'react'
import { Link } from 'react-router-dom'
import { Text, Group, Card, Badge } from '@mantine/core'
import MonumentMenu from './MonumentMenu'
import { getCloudinaryUrl } from '../utils/helpers'
import SquareImage from '../components/SquareImage'

const DEFAULT_IMAGE = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000"

const MonumentCard = ({ monument, selected = false }) => {
  const { monumentid, name, description, address, images, categories } = monument
  const road = address?.road || 'Unknown Road'
  const houseNumber = address?.house_number || ''
  const fullStreetName = `${road} ${houseNumber}`.trim()
  const image = getCloudinaryUrl(images?.[0], { width: 500 }) || DEFAULT_IMAGE
  const destinationUrl = `/monuments/${monumentid}`

  return (
    <Card shadow="none" className={`monument-card ${selected ? 'selected' : ''}`} padding="none" radius="sm">
      <Card.Section mb="sm" style={{ width: "100%" }}>
        <Link to={destinationUrl} style={{ textDecoration: 'none' }}>
          <SquareImage src={image} alt={name} />
        </Link>
      </Card.Section>

      <Group wrap="nowrap" justify="space-between" mb="sm">
        <Text fw={600}>{name}</Text>
        <MonumentMenu monumentId={monumentid} />
      </Group>

      <Text fw={400}>{fullStreetName}</Text>

      <Text size="sm" c="dimmed" lineClamp={3}>
        {description}
      </Text>

      <Group mt="xs" gap="xs" style={{ height: 30 }}>
        {categories.slice(0, 3).map(category => (
          <Badge key={`badge-${monumentid}-${category}`} size="sm" color="green">
            {category}
          </Badge>
        ))}
      </Group>
    </Card>
  )
}

export default MonumentCard
