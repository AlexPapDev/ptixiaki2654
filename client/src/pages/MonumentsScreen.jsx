import { useState, useEffect, useCallback } from 'react'
import Map from '../components/Map'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import useAppStore from '../utils/AppStore'
import MonumentCard from '../components/MonumentCard'
import { Group, Card, Skeleton, Box } from '@mantine/core'
import NoResults from '../components/NoResults'
import { motion } from 'framer-motion'

const Monuments = () => {
  const { searchTerm, mapBounds, clickedMonumentMarker } = useAppStore()
  const [searchParams] = useSearchParams()
  const passedTerm = searchParams.get('q') || searchTerm
  const category = searchParams.get('cat') || ''

  const [monuments, setMonuments] = useState([])
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

  const fetchData = useCallback(async (controller) => {
    if (
      !mapBounds ||
      !mapBounds._ne || !mapBounds._sw ||
      !mapBounds._ne.lat || !mapBounds._ne.lng ||
      !mapBounds._sw.lat || !mapBounds._sw.lng
    ) return

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
      <Card key={`skeleton-${index}`} shadow="sm" padding="lg" radius="md" withBorder>
        <Skeleton height={200} radius="sm" />
        <Skeleton height={16} mt="md" width="60%" />
        <Skeleton height={16} mt="sm" width="80%" />
      </Card>
    ))
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="content-wrapper"
    >
      <Group align="flex-start">
        {!loading && monuments.length === 0
          ? <NoResults />
          : <Box className="content_section grid m-t-1 p-b-1">
              {loading
                ? renderSkeletonCards()
                : monuments.map((monument, i) => (
                  <motion.div
                    key={'monument-card-' + i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                  >
                    <MonumentCard 
                      monument={monument} 
                      selected={monument.monumentid === clickedMonumentMarker}
                    />
                  </motion.div>
                ))
              }

          </Box>
        }

        <Box className="map_section" visibleFrom="sm">
          <Map data={monuments} fetchData={fetchData} />
        </Box>
      </Group>
    </motion.section>
  )
}

export default Monuments
