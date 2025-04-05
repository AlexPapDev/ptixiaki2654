import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAppStore from '../utils/AppStore';
import { Container, Group, Button, Paper } from '@mantine/core';

const CategoriesBar = ({ categories = [] }) => {
  const location = useLocation();
  const { setSearchTerm } = useAppStore();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const activeCategory = searchParams.get('cat');

  // Function to clear all query parameters
  const clearFilters = () => {
    setSearchTerm(null);
    navigate('/monuments/'); // Navigate to /monuments/ without query params
  };

  return (
    <Paper shadow="xs" p="md">
      <Container fluid px={32} >
        <Group justify="center" spacing={16}>
          {categories.map((category) => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('cat', category);
            const isActive = activeCategory === category;

            return (
              <Button
                key={category}
                radius="xl"
                variant={isActive ? 'filled' : 'outline'}
                color={isActive ? 'blue' : 'gray'}
                onClick={() => navigate(`/monuments/?${newSearchParams.toString()}`)}
                sx={(theme) => ({
                  padding: '8px 16px',
                  borderBottom: isActive ? '2px solid #007bff' : '2px solid transparent',
                  transition: 'background-color 0.3s, border-bottom 0.3s',
                  '&:hover': {
                    backgroundColor: theme.colors.gray[0],
                    borderBottom: `2px solid ${theme.colors.gray[3]}`,
                  },
                })}
              >
                {category}
              </Button>
            );
          })}
          <Button variant="light" onClick={clearFilters} size="sm" sx={{ padding: '5px 10px' }}>
            Clear Filters
          </Button>
        </Group>
      </Container>
    </Paper>
  );
};

export default CategoriesBar;
