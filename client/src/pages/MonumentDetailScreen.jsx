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
import useAddMonumentPhoto from '../hooks/useAddMonumentPhoto'
import MonumentDetailGrid from '../components/MonumentDetailGrid'
import MonumentDetailMap from '../components/MonumentDetailMap'
import WorkingHours from '../components/WorkingHours'
import MonumentDetailActions from '../components/MonumentDetailActions'
import MonumentDetailAddress from '../components/MonumentDetailAddress'
import MonumentDetailDescription from '../components/MonumentDetailDescription'
import MonumentDetailCategories from '../components/MonumentDetailCategories'
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

  const { handleAddPhoto } = useAddMonumentPhoto(monumentId,  () => {
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

  return (
    <Container>
      <Group pt="lg">
        <Title order={2}>{monument?.name}</Title>
      </Group>

      <Box mt="lg">
        <MonumentDetailGrid images={monument?.images} />
      </Box>

      <Grid>
        <Grid.Col span={7}>
          <MonumentDetailActions loggedIn={loggedIn} 
            handleAddPhoto={handleAddPhoto}
            handleDelete={handleDeleteClick}
          />
          <MonumentDetailAddress initialAddress={monument.address} />
          <MonumentDetailDescription monumentId={monumentId} initialDescription={monument.description}/>
          <Divider mt="md" pb="md" />
          <MonumentDetailCategories monumentId={monumentId} initialCategories={monument.categories}/>
          <Divider mt="md" pb="md" />
          <WorkingHours
            monumentId={monumentId}
            initialHours={monument.hours}
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
    </Container>
  )
}

export default MonumentDetail
