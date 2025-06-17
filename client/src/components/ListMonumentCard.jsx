import { AspectRatio, Text, Stack, Divider, Group, Image,Box } from '@mantine/core'
import { getCloudinaryUrl } from '../utils/helpers'
const DEFAULT_IMAGE = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000"

const ListMonumentCard = ({ monument }) => {
  const imageUrl = getCloudinaryUrl(monument.main_image_url, { width: 300 })
  return (<Stack>
    <Divider></Divider>
    <Group wrap="nowrap" align="flex-start">
      <AspectRatio style={{flexShrink: 0}}>
        <Image src={imageUrl} fallbackSrc={DEFAULT_IMAGE} height="90px" radius="xs"/>
      </AspectRatio>
    
      <Stack justify="flex-start" gap="xs" mt="xs" >
        <Text>{monument.name}</Text>
        <Text size="sm" c="dimmed" inline>{monument.description}</Text>
      </Stack>
    </Group>
    
  </Stack>);
}
export default ListMonumentCard