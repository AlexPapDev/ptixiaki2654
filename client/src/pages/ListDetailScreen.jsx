import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Grid, Box, Title } from '@mantine/core'
import MonumentsMap from '../components/MonumentsMap'
import MonumentDetailGrid from '../components/MonumentDetailGrid'
import useListDetail from '../hooks/useListDetail'
const DEFAULT_IMAGE = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=2000"

const ListDetail = () => {
  const { listId } = useParams()
  const navigate = useNavigate()
  const { list, loading, error } = useListDetail(listId)

  return (<Box>
    <Grid>
      <Grid.Col span={6}>
        <Box>
          {/* TODO: change name of grid */}
          <MonumentDetailGrid />
        </Box>
        <Title>{list.name}</Title>
      </Grid.Col>
      <Grid.Col span={6}>
        <Box className="list_map_section">
          <MonumentsMap data={[]} />
        </Box>
      </Grid.Col>
    </Grid>
  </Box>)
}
export default ListDetail