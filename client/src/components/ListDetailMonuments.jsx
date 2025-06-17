import { SimpleGrid, Text, Stack, Grid, Group, Image,Box } from '@mantine/core'
import { getCloudinaryUrl } from '../utils/helpers'
import ListMonumentCard from './ListMonumentCard'
const DEFAULT_IMAGE = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000"

const ListDetailMonuments = ({ monuments = [] }) => {
  // const imageUrls = [...getCloudinaryUrl(images, { width: 1000 }), ...Array(Math.max(0, 5 - images.length)).fill(DEFAULT_IMAGE)]
  return (<Stack px="lg" pt="lg" gap="sm">
    <Text>{monuments.length} monuments</Text>
    {monuments.map(monument => <ListMonumentCard monument={monument} />)}
  </Stack>)
}
export default ListDetailMonuments