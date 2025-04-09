import { useState, useEffect } from 'react'
import useAuthStore from '../utils/AuthStore'
import { Stack, Text, Card,  Group, Title, Button } from '@mantine/core'

const MyLists = () => {
  const { user } = useAuthStore()
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true)
      try {
        // Replace with actual API call
        const fakeData = [
          { id: 1, title: 'Best Coffee Shops', description: 'My go-to places for a latte.' },
          { id: 2, title: 'Weekend Hikes', description: 'Scenic trails I love.' }
        ]
        setLists(fakeData)
      } catch (err) {
        console.error('Error fetching my lists:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchLists()
    }
  }, [user])
  return (<>
    <Stack>

    </Stack>
  </>)
}
export default MyLists