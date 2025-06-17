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
  if (!list) return <></>
  const monumentImages = monuments.slice(0, 5).map(mon => mon.main_image_url)
  return (<Box>
    <Grid p="none" gutter={0}>
      <Grid.Col span={6} >
        {/* <Paper shadow="md"> */}
          {/* TODO: change name of grid */}
          <ListDetailGrid images={monumentImages}/>
          {/* <ListDetailGrid /> */}
        
          <Stack align="flex-start" pl="lg" pt="md" gap="sm">
            <Title>{list?.name}</Title>
            <Text fw={600}>{list?.description}</Text>
            <Text c="gray.5" component={Link} to={`/user/${user?.userid}`}>
              By {list?.full_name}
            </Text>
            <Button color="teal" leftSection={<Heart size={14} />} onClick={onFollowListHandler}>
              Follow List
            </Button>
            
          </Stack>
          <ListDetailMonuments monuments={monuments}/>
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