import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Grid, Stack, Text, Box, Radio, Group } from '@mantine/core'
import MonumentsMap from '../components/MonumentsMap'
import ListDetailMonuments from '../components/ListDetailMonuments'
import ListDetailTitle from '../components/ListDetailTitle'
import ListDetailDescription from '../components/ListDetailDescription'
import FollowListButton from '../components/FollowListButton'
import ListDetailGrid from '../components/ListDetailGrid'
import useListDetail from '../hooks/useListDetail'
import useAuthStore from '../utils/AuthStore'
import ListPrivacyToggle from '../components/ListPrivacyToggle'
const ListDetail = () => {
  const { listId } = useParams()
  const { list, loading, error } = useListDetail(listId)
  const { user } = useAuthStore()
  const { user: listUser, monuments = [] } = list || {}

  const isOwnList = list && list?.userid === user?.userid
  if (!list && !loading) return <>
    <Text pt="md">List Not Found!</Text>
  </>
  if (!list && loading) return <></>
  const monumentImages = monuments.slice(0, 5).map(mon => mon.main_image_url)
  return (<Box>
    <Grid p="none" gutter={0}>
      <Grid.Col span={6} className="list_detail_section">
          <ListDetailGrid images={monumentImages}/>
        
          <Stack align="flex-start" pl="lg" pt="md" gap="sm">
            <ListDetailTitle listId={listId} initialTitle={list?.name} showEdit={isOwnList}/>
            <ListDetailDescription listId={listId} initialDescription={list?.description} showEdit={isOwnList}/>
            {isOwnList && <ListPrivacyToggle listId={listId} initialIsPublic={list.is_public}/>}
            <Text c="gray.5" component={Link} to={`/user/${listUser?.userid}`}>
              By {list?.full_name}
            </Text>
            <FollowListButton listId={listId} isInitiallyFollowing={list?.is_followed_by_current_user}/>
            
          </Stack>
          <ListDetailMonuments monuments={monuments}/>
        {/* </Paper> */}
      </Grid.Col>
      <Grid.Col padding="0" p="none" span={6} style={{padding: '0 !important'}}>
        <Box className="list_map_section">
          <MonumentsMap data={monuments} />
        </Box>
      </Grid.Col>
    </Grid>
  </Box>)
}
export default ListDetail