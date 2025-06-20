import { AspectRatio, Text, Stack, Divider, Group, Image,Box } from '@mantine/core'
import { getCloudinaryUrl } from '../utils/helpers'
import AddToListButton from './AddToListButton'
import SquareImage from './SquareImage'
const DEFAULT_IMAGE = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000"

const ListMonumentCard = ({ monument }) => {
  const imageUrl = getCloudinaryUrl(monument.main_image_url, { width: 300 })
  return (<Stack>
    <Divider></Divider>
    <Group  wrap="nowrap" justify="space-between">
      <Group wrap="nowrap" align="flex-start">
        <SquareImage src={imageUrl} fallbackSrc={DEFAULT_IMAGE} height="90px" outerStyle={{flexShrink: 0}} radius="xs" />
      
        <Stack justify="flex-start" gap="xs" mt="xs" >
          <Text>{monument.name}</Text>
          <Text size="sm" c="dimmed" inline>{monument.description}</Text>
        </Stack>
      </Group>
      <AddToListButton monumentId={monument.monumentid} isIcon={true}/>
    </Group>
    
  </Stack>)
}
export default ListMonumentCard