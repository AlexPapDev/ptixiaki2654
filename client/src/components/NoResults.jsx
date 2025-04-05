// src/components/NoResults.js
import React from 'react'
import { Card, Text, Container, Center } from '@mantine/core'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

const NoResults = () => (
  <Container style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card padding="lg" radius="md" style={{ textAlign: 'center', backgroundColor: 'white', maxWidth: '400px' }}>
        <Center style={{ marginBottom: '20px' }}>
          <Search size={64} color="#888" />
        </Center>
        <Text size="xl" weight={600} style={{ color: '#333' }}>
          Uh-oh, no monuments found!
        </Text>
        <Text size="md" style={{ color: '#888', marginTop: '10px' }}>
          Try adjusting your search query or zooming in on the map for more results.
        </Text>
      </Card>
    </motion.div>
  </Container>
)

export default NoResults
