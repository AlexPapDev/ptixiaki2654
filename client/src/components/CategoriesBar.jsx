import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAppStore from '../utils/AppStore'
import { Container, Group, Button, Paper, UnstyledButton, Text, Flex } from '@mantine/core'
import { CATEGORIES } from '../utils/constants'
import TabButton from '../components/TabButton'
const CategoriesBar = ({hideClearFilters}) => {
  const location = useLocation()
  const { setSearchTerm } = useAppStore()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const activeCategory = searchParams.get('cat')

  // Function to clear all query parameters
  const clearFilters = () => {
    setSearchTerm(null)
    navigate('/monuments/') // Navigate to /monuments/ without query params
  }

  return (
    <Paper shadow="none" pb="sm" pt="0" radius="0">
  <Container fluid px={32}>
    <Flex justify="space-between" align="center">
      <Group justify="center" spacing={16} style={{ flex: 1 }}>
        {CATEGORIES.map((category) => {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set('cat', category);
          const isActive = activeCategory === category;
          return (
            <TabButton
              key={category}
              isActive={isActive}
              size="sm"
              onClick={() => navigate(`/monuments/?${newSearchParams.toString()}`)}
            >
              {category}
            </TabButton>
          );
        })}
      </Group>
      {!hideClearFilters && (
        <Button
          variant="light"
          onClick={clearFilters}
          size="xs"
          sx={{ padding: '5px 10px', marginLeft: 16 }}
        >
          Clear Filters
        </Button>
      )}
    </Flex>
  </Container>
</Paper>

  )
}

export default CategoriesBar
