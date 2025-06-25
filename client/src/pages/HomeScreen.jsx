// pages/HomeScreen.jsx
import { useContext } from 'react'; // Removed unused imports
import { useNavigate } from 'react-router-dom';
import { Box,Container, Title } from '@mantine/core'; // Removed TextInput, Button, Text, Group as they are now in HomeSearchInput
import useAppStore from '../utils/AppStore';
import DiscoverLists from '../components/DiscoverLists';
import { ScrollContext } from '../contexts/ScrollContext';
import WelcomeText from '../components/WelcomeText';
import HomeSearchInput from '../components/HomeSearchInput'; // Import the new component

const Home = () => {
  const navigate = useNavigate();
  const { setSearchTerm } = useAppStore();
  const { setTextInputTopOffset, isScrolledPastThreshold } = useContext(ScrollContext);

  // This function will be passed down to HomeSearchInput to handle the actual navigation
  const handleSearchNavigation = (activeTab, searchTerm) => {
    const routeMap = {
      monuments: '/monuments',
      lists: '/lists',
      articles: '/articles',
    };

    const path = routeMap[activeTab];
    if (path) {
      setSearchTerm(searchTerm);
      navigate(`${path}?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <Container align="center" style={{ alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
      <Title mb="sm" order={1}>Search</Title>

      <HomeSearchInput
        onSearch={handleSearchNavigation}
        setTextInputTopOffset={setTextInputTopOffset}
      />

      <Box my="xl" py="xl">
        <WelcomeText />
      </Box>
      <Box my="xl">
        <DiscoverLists hideSearch />
      </Box>
    </Container>
  );
};

export default Home