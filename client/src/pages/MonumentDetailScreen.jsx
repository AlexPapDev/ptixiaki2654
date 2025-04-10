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
} from '@mantine/core'
import useMonumentDetail from '../hooks/useMonumentDetail'
import useDeleteMonument from '../hooks/useDeleteMonument'
import MonumentDetailGrid from '../components/MonumentDetailGrid'
import MonumentDetailTextInfo from '../components/MonumentDetailTextInfo'
import MonumentDetailMap from '../components/MonumentDetailMap'
import WorkingHours from '../components/WorkingHours'

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

  if (loading || error) {
    return (
      <Center h="100%">
        {loading ? <Loader /> : <Text color="red">{error}</Text>}
      </Center>
    )
  }

  return (
    <Container>
      <Group pt="lg">
        <Title order={2}>{monument?.name}</Title>
        {isLoggedIn() && <>
          <Button color="teal">Edit</Button>
          <Button color="red" onClick={handleDeleteClick}>Delete</Button>
          </>}
      </Group>

      <Box mt="lg">
        <MonumentDetailGrid images={monument?.images} />
      </Box>

      <Grid>
        <Grid.Col span={7}>
          <MonumentDetailTextInfo monument={monument} />
          <Divider pb="md" />
          <WorkingHours
            hoursPerDay={monument.workingHours}
            isPublic={monument.isPublic}
          />
        </Grid.Col>
        <Grid.Col pl="md" span={5} pt="xl">
          <Box style={{ height: '100%', width: '100%' }}>
            <MonumentDetailMap
              lat={monument?.latitude}
              lng={monument?.longitude}
            />
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default MonumentDetail
