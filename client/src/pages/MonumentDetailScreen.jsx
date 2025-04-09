import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Title, Group, Button, Box, Text, Stack, Divider, Grid } from '@mantine/core'
import MonumentDetailGrid from '../components/MonumentDetailGrid'
import MonumentDetailTextInfo from '../components/MonumentDetailTextInfo'
import WorkingHours from '../components/WorkingHours'
const MonumentDetail = () => {
  const { monumentId } = useParams()
  const [monument, setMonument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'
  // const url = getCloudinaryUrl(monument?.images[0])
  useEffect(() => {
    const fetchMonument = async () => {
      try {
        setLoading(true)
        const result = await axios.get(`${API_BASE_URL}/api/monuments/${monumentId}`)
        const { monument } = result.data.data
        const { name, description, categories = [], images = [], address, address: { city, road }} = monument
        setMonument({
          name, description, city, road, categories, images, address, isPublic: true
        })
        
      } catch (err) {
        setError('Failed to load monument details')
      } finally {
        setLoading(false)
      }
    }

    if (monumentId) {
      fetchMonument()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monumentId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <Container>
      <Group pt="lg">
        <Title order={2}>{monument?.name}</Title>
        <Button color="teal">Edit</Button>
        <Button color="coral">Delete</Button>
      </Group>
      
      <div mt="lg">
        <MonumentDetailGrid images={monument?.images} />
      </div>
      <Grid>
        <Grid.Col span={7}>
          <MonumentDetailTextInfo monument={monument} />
        </Grid.Col>
        <Grid.Col span={5} pt="xl">
          <Box ml="auto" maw={300}>
            <WorkingHours hoursPerDay={[]} isPublic={monument.isPublic}/>
          </Box>
        </Grid.Col>
      </Grid>
      
    </Container>
  )
}

export default MonumentDetail
