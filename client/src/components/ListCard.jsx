import { Link } from 'react-router-dom'
import { Card, Grid, Text } from '@mantine/core'
import SquareImage from '../components/SquareImage'
import { getCloudinaryUrl } from '../utils/helpers'
import { DEFAULT_IMAGE } from '../utils/constants'

const ListCard = ({ list }) => {
  const { createdBy, listid } = list
  const destinationUrl = `/list/${listid}`
  const images = list.monuments.slice(0, 3).map(monument => monument.mainImage)
  const fullUrls = getCloudinaryUrl(images)
  return (
    <Card padding="none">
      <Card.Section mb="sm" style={{ width: "100%" }}>
        <Link to={destinationUrl} style={{ textDecoration: 'none' }}>
          <Grid>
            <Grid.Col p={0} span={8}>
              <SquareImage src={fullUrls[0]} fallbackSrc={DEFAULT_IMAGE} />
            </Grid.Col>
            <Grid.Col p={0} span={4}>
              <SquareImage src={fullUrls[1]} fallbackSrc={DEFAULT_IMAGE} />
              <SquareImage src={fullUrls[2]} fallbackSrc={DEFAULT_IMAGE} />
            </Grid.Col>
          </Grid>
        </Link>
      </Card.Section>

      <Text mt="sm" mb="xs">{list.name}</Text>
      <Text size="sm" c="gray.6" lineClamp={3}>{list.description}</Text>
      {
        list?.userid ? (
          <Text c="gray.5" component={Link} to={`/user/${createdBy?.userid}`}>
            By {list?.full_name}
          </Text>
        ) : (
          <Text c="gray.5">By {list?.full_name}</Text>
        )
      }
    </Card>
  )
}

export default ListCard
