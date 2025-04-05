import { useState, useEffect, useCallback } from 'react'
import Map from '../components/Map'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import useAppStore from '../utils/AppStore'
import MonumentCard from '../components/MonumentCard'
import { Group, Grid, Card, Skeleton } from '@mantine/core'

const Monuments = () => {
  const { searchTerm, mapBounds, clickedMonumentMarker } = useAppStore()
  const [searchParams] = useSearchParams()
  const passedTerm = searchParams.get('q') || searchTerm
  const category = searchParams.get('cat') || ''

  const [monuments, setMonuments] = useState([])
  const [loading, setLoading] = useState(false)

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

  const fetchData = useCallback(async (controller) => {
    if (
      !mapBounds ||
      !mapBounds._ne || !mapBounds._sw ||
      !mapBounds._ne.lat || !mapBounds._ne.lng ||
      !mapBounds._sw.lat || !mapBounds._sw.lng
    ) return;

    setLoading(true)
    try {
      const result = await axios.get(`${API_BASE_URL}/api/monuments/`, {
        signal: controller.signal,
        params: {
          query: passedTerm,
          category,
          mapBounds: {
            ne: { ...mapBounds._ne },
            sw: { ...mapBounds._sw },
          }
        }
      })
      setMonuments(result.data.data.monuments)
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled')
      } else {
        console.error('Error fetching monuments:', error)
      }
    } finally {
      setLoading(false)
    }
  }, [API_BASE_URL, passedTerm, category, mapBounds])

  useEffect(() => {
    const controller = new AbortController()
    fetchData(controller)
    return () => controller.abort()
  }, [fetchData])

  const renderSkeletonCards = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      // <Grid.Col span={4} key={`skeleton-${index}`}>
        <Card key={`skeleton-${index}`} shadow="sm" padding="lg" radius="md" withBorder>
          <Skeleton height={200} radius="sm" />
          <Skeleton height={16} mt="md" width="60%" />
          <Skeleton height={16} mt="sm" width="80%" />
        </Card>
      // </Grid.Col>
    ))
  }

  return (
    <Group align="flex-start">
      <section className="content_section grid m-t-1">
        {loading
        ? renderSkeletonCards()
        : monuments?.map((monument, i) => (
              <MonumentCard 
                key={'monument-card-' + i}
                monument={monument} 
                selected={monument.monumentid === clickedMonumentMarker}
              />
          ))
        }
      </section>

      <section className="map_section">
        <Map data={monuments} fetchData={fetchData} />
      </section>
    </Group>
  )
}

export default Monuments
