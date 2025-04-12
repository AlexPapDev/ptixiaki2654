import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Text, Container, Center, Button } from '@mantine/core'
import { CircleAlert } from 'lucide-react'
import { motion } from 'framer-motion'

const UserNotFound = () => (
  <Container style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card padding="lg" radius="md" style={{ textAlign: 'center', backgroundColor: 'white', maxWidth: '400px' }}>
        <Center style={{ marginBottom: '20px' }}>
          <CircleAlert size={64} color="#888" />
        </Center>
        <Text size="xl" weight={600} mb="md" c="dimmed">
          There is no user with this id!
        </Text>
        <Link to='/'>
          <Button variant="outline">
            Back to Home Page
          </Button>
        </Link>
      </Card>
    </motion.div>
  </Container>
)

export default UserNotFound
