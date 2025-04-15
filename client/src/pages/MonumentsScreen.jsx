import { useState } from 'react'
import MonumentsMap from '../components/MonumentsMap'
import { useSearchParams } from 'react-router-dom'
import useAppStore from '../utils/AppStore'
import MonumentCard from '../components/MonumentCard'
import { Group, Card, Skeleton, Box } from '@mantine/core'
import NoResults from '../components/NoResults'
import { motion } from 'framer-motion'
import useFetchMonuments from '../hooks/useFetchMonuments' // Import the custom hook

const Monuments = () => {
  const { searchTerm, mapBounds, clickedMonumentMarker } = useAppStore()
  const [searchParams] = useSearchParams()
  const passedTerm = searchParams.get('q') || searchTerm
  const category = searchParams.get('cat') || ''

  const { monuments, loading, error } = useFetchMonuments(passedTerm, category, mapBounds)

  const renderSkeletonCards = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <Card key={`skeleton-${index}`} shadow="sm" padding="lg" radius="md" withBorder>
        <Skeleton height={200} radius="sm" />
        <Skeleton height={16} mt="md" width="60%" />
        <Skeleton height={16} mt="sm" width="80%" />
      </Card>
    ))
  }

  if (error) {
    return <div>Error loading monuments.</div>
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
          <MonumentsMap data={monuments}/>
        </Box>
      </Group>
    </motion.section>
  )
}

export default Monuments