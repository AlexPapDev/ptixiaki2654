import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Grid, Paper, Text, Box, Title, Container } from '@mantine/core'
import MonumentsMap from '../components/MonumentsMap'
import MonumentDetailGrid from '../components/MonumentDetailGrid'
import ListDetailGrid from '../components/ListDetailGrid'
import useListDetail from '../hooks/useListDetail'
const DEFAULT_IMAGE = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000"

const ListDetail = () => {
  const { listId } = useParams()
  const navigate = useNavigate()
  const { list, loading, error } = useListDetail(listId)
  const { user, monuments = [] } = list || {}
  return (<Box>
    <Grid p="none" gutter={0}>
      <Grid.Col span={6} >
        {/* <Paper shadow="md"> */}
          {/* TODO: change name of grid */}
          <MonumentDetailGrid />
          {/* <ListDetailGrid /> */}
        
          <Container>
            <Title>{list?.name}</Title>
            <Text fw={600}>{list?.description}</Text>
            <Text c="gray.5" component={Link} to={`/user/${user?.userid}`}>
              By {user?.lastname}
            </Text>
          </Container>
        {/* </Paper> */}
      </Grid.Col>
      <Grid.Col padding="0" p="none" span={6} style={{padding: '0 !important'}}>
        <Box className="list_map_section">
          <MonumentsMap data={[]} />
        </Box>
      </Grid.Col>
    </Grid>
  </Box>)
}
export default ListDetail