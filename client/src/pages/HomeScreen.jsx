import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TabButton from '../components/TabButton'
import { TextInput, Button, Text, Container, Title, Group } from '@mantine/core'
import { Search, Newspaper, Library, Landmark } from 'lucide-react'
import useAppStore from '../utils/AppStore'
const Home = () => {
  const [activeTab, setActiveTab] = useState('monuments')
  const [inputTerm, setInputTerm] = useState('')
  const navigate = useNavigate()
  const { setSearchTerm } = useAppStore()
  const placeholder = `Search ${activeTab}`

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleSearch = () => {
    if (!inputTerm.trim()) return

    const routeMap = {
      monuments: '/monuments',
      lists: '/lists',
      articles: '/articles',
    }

    const path = routeMap[activeTab]
    if (path) {
      const trimmedTerm = inputTerm.trim()
      setSearchTerm(trimmedTerm)
      navigate(`${path}?q=${encodeURIComponent(inputTerm.trim())}`)
    }
  }

  return (
    <Container align="center" style={{ alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
      <Title mb="sm" order={1}>Search</Title>
      <Group gap='lg' align='center' justify="center">
        <TabButton
          isActive={activeTab === 'monuments'}
          Icon={Landmark}
          onClick={() => handleTabChange('monuments')}
        >
          Monuments
        </TabButton>
        <TabButton
          isActive={activeTab === 'lists'}
          Icon={Library}
          onClick={() => handleTabChange('lists')}
        >
          Lists
        </TabButton>
        <TabButton
          isActive={activeTab === 'articles'}
          Icon={Newspaper}
          onClick={() => handleTabChange('articles')}
        >
          Articles
        </TabButton>
      </Group>
      <Group justify="center">
        <TextInput
          mt="md"
          radius="100px"
          placeholder={placeholder}
          rightSectionWidth={116}
          onChange={(e) => setInputTerm(e.target.value)}
          value={inputTerm}
          style={{ width: '840px' }}
          size="xl"
          leftSection={
            <Search size={24} />
          }
          rightSection={
            <Button
              size="lg"
              radius="100px"
              color="primary"
              onClick={handleSearch}
              disabled={!inputTerm.trim()}
            >
              <Text fw={600}>Search</Text>
            </Button>
          }
        />
      </Group>
    </Container>
  )
}

export default Home
