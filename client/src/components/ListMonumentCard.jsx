import { AspectRatio, Text, Stack, Divider, Group, Image,Box } from '@mantine/core'
import { getCloudinaryUrl } from '../utils/helpers'
const DEFAULT_IMAGE = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000"

const ListMonumentCard = ({ monument }) => {
  // const imageUrls = [...getCloudinaryUrl(images, { width: 1000 }), ...Array(Math.max(0, 5 - images.length)).fill(DEFAULT_IMAGE)]
  return (<Stack>
    <Divider></Divider>
    <Group>
      <AspectRatio>
        <Image src={monument} fallbackSrc={DEFAULT_IMAGE} height="90px"/>
      </AspectRatio>
    
      <Text>{monument.name}</Text>
    </Group>
    
  </Stack>);
}
export default ListMonumentCard