import { SimpleGrid, Grid, Group, Image,Box } from '@mantine/core'
import SquareImage from '../components/SquareImage'
const DEFAULT_IMAGE = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000"

const ListDetailGrid = ({ images }) => {
  const imageUrls = [
    DEFAULT_IMAGE,DEFAULT_IMAGE,DEFAULT_IMAGE,DEFAULT_IMAGE,DEFAULT_IMAGE
  ]
  return (<Box style={{height: '100%'}}>
    <SimpleGrid style={{height: '100%'}} cols={{ base: 2, sm: 2, lg: 2 }}> 
      <Box>
      <Image src={DEFAULT_IMAGE} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}/>
                </Box>
      <Box style={{height: '100%'}}>
        <Image src={DEFAULT_IMAGE} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}/>
        <Image src={DEFAULT_IMAGE} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}/>
      </Box>
    </SimpleGrid>
  </Box>)
}
export default ListDetailGrid