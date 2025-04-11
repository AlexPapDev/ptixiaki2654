import React from 'react'
import { Link } from 'react-router-dom'
import { Text, Group, Card, Image, Badge } from '@mantine/core'
import MonumentMenu from './MonumentMenu'
import { getCloudinaryUrl } from '../utils/helpers'

const MonumentCard = ({ monument, selected = false }) => {
  const { monumentid, name, description, address, images, categories } = monument
  const road = address?.road || 'Unknown Road'
  const houseNumber = address?.house_number || ''
  const fullStreetName = `${road} ${houseNumber}`.trim()
  const cloudinaryUrl = getCloudinaryUrl(images?.[0], { width: 300})
  const image = cloudinaryUrl || 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000'
  const destinationUrl = `/monuments/${monumentid}`

  return (
      <Card shadow="none" className={`monument-card ${selected ? 'selected' : ''}`} padding="none" radius="sm">
        <Card.Section mb="sm" style={{  width:"100%"}}>
          <Link to={destinationUrl} style={{ textDecoration: 'none' }}>
          <div style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: '8px' }}>
            <Image
              src={image}
              alt={name}
              style={{
                width: '100%',
                height: '100%',
                // objectFit: 'cover',
                display: 'block',
              }}
              object-fit="cover"
            />
            </div>
          </Link>
        </Card.Section>

        <Group wrap="nowrap" justify="space-between" mb="sm">
          <Text fw={600}>{name}</Text>
          <MonumentMenu monumentId={monumentid} /> {/* This will render the menu next to the title */}
        </Group>

        <Text fw={400}>{fullStreetName}</Text>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {description}
        </Text>

        <Group mt="xs" gap="xs" style={{ height: 30 }}>
          {categories.slice(0, 3).map(categoryName => (<Badge key={`badge-${monumentid}-${categoryName}`} size="sm" color="green">{categoryName}</Badge>))}
        </Group>
      </Card>
  )
}

export default MonumentCard
