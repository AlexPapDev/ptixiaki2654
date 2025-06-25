import { useParams, useNavigate } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
import {
  Container,
  Title,
  Group,
  Button,
  Box,
  Text,
  Divider,
  Grid,
  Center,
  Loader,
  AspectRatio,
} from '@mantine/core'
import useMonumentDetail from '../hooks/useMonumentDetail'
import useDeleteMonument from '../hooks/useDeleteMonument'
import useAddPhoto from '../hooks/useAddPhoto'
import MonumentDetailGrid from '../components/MonumentDetailGrid'
import MonumentDetailMap from '../components/MonumentDetailMap'
import WorkingHours from '../components/WorkingHours'
import MonumentDetailActions from '../components/MonumentDetailActions'
import MonumentDetailAddress from '../components/MonumentDetailAddress'
import MonumentDetailDescription from '../components/MonumentDetailDescription'
import MonumentDetailCategories from '../components/MonumentDetailCategories'
import MonumentEras from '../components/MonumentEras'
import { toast } from 'react-toastify'
const MonumentDetail = () => {
  const { monumentId } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStore()
  const { monument, loading, error } = useMonumentDetail(monumentId)
  const { handleDeleteClick } = useDeleteMonument(monumentId, () => {
    toast.success('Record deleted successfully!', { position: 'top-right' })
    navigate('/monuments', { replace: true })
  })

  const { addMonumentPhoto } = useAddPhoto(monumentId,  () => {
    toast.success('Photo added succesfully  successfully!', { position: 'top-right' })
    window.location.reload()
  })

  if (loading || error) {
    return (
      <Center h="100%">
        {loading ? <Loader /> : <Text color="red">{error}</Text>}
      </Center>
    )
  }

  const loggedIn = isLoggedIn()
  const monumenteras = monument.monumenteras
  return (
    <Container pb="xl">
      <Group pt="lg">
        <Title order={1}>{monument?.name}</Title>
      </Group>

      <Box mt="lg">
        <MonumentDetailGrid images={monument?.images} />
      </Box>

      <Grid>
        <Grid.Col span={7}>
          <MonumentDetailActions loggedIn={loggedIn} 
            handleAddPhoto={addMonumentPhoto}
            handleDelete={handleDeleteClick}
            monumentId={monumentId}
          />
          <MonumentDetailAddress initialAddress={monument.address} canEdit={loggedIn}/>
          <MonumentDetailDescription monumentId={monumentId} initialDescription={monument.description} canEdit={loggedIn}/>
          <Divider mt="md" pb="md" />
          <MonumentDetailCategories monumentId={monumentId} initialCategories={monument.categories} canEdit={loggedIn}/>
          <Divider mt="md" pb="md" />
          <WorkingHours
            monumentId={monumentId}
            initialHours={monument.hours}
            canEdit={loggedIn}
          />
        </Grid.Col>
        <Grid.Col pl="md" span={5} pt="xl">
          <Box style={{ height: '100%', width: '100%' }}>
            <AspectRatio>
              <MonumentDetailMap
                lat={monument?.latitude}
                lng={monument?.longitude}
              />
            </AspectRatio>
          </Box>
        </Grid.Col>
      </Grid>
      <Divider mt="md" pb="md" />
      <MonumentEras monumentId={monumentId} initialMonumentEras={monumenteras} canEdit={loggedIn}/>
    </Container>
  )
}

export default MonumentDetail
