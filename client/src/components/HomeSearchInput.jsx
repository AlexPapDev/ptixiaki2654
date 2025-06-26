import { useState, useEffect, useRef, useCallback } from 'react'
import { TextInput, Button, Text, Group, Paper } from '@mantine/core'
import { Search, Newspaper, Library, Landmark } from 'lucide-react'
import TabButton from './TabButton'

const HomeSearchInput = ({ initialTab = 'monuments', onSearch, setTextInputTopOffset }) => {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [inputTerm, setInputTerm] = useState('')
  const placeholder = `Search ${activeTab}`

  const textInputRef = useRef(null)

  useEffect(() => {
    if (textInputRef.current && setTextInputTopOffset) {
      const observer = new ResizeObserver(() => {
        setTextInputTopOffset(textInputRef.current.offsetTop)
      })

      observer.observe(textInputRef.current)

      return () => {
        observer.disconnect()
      };
    }
  }, [setTextInputTopOffset])

  // Handle search action
  const handleSearch = useCallback(() => {
    if (!inputTerm.trim()) return
    onSearch(activeTab, inputTerm.trim())
  }, [activeTab, inputTerm, onSearch])

  // Handle Enter key press for search
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }, [handleSearch])

  return (
    <>
      <Group gap="lg" align="center" justify="center" mb="lg">
        <TabButton
          isActive={activeTab === 'monuments'}
          Icon={Landmark}
          onClick={() => setActiveTab('monuments')}
        >
          Monuments
        </TabButton>
        <TabButton
          isActive={activeTab === 'lists'}
          Icon={Library}
          onClick={() => setActiveTab('lists')}
        >
          Lists
        </TabButton>
        <TabButton
          isActive={activeTab === 'articles'}
          Icon={Newspaper}
          onClick={() => setActiveTab('articles')}
        >
          Articles
        </TabButton>
      </Group>

      <Group justify="center" mb="lg">
        <Paper shadow="xs" radius="100px" mt="md">
        <TextInput
          ref={textInputRef}

          radius="100px"
          placeholder={placeholder}
          rightSectionWidth={120}
          onChange={(e) => setInputTerm(e.target.value)}
          value={inputTerm}
          style={{ width: '850px', maxWidth: '100%' }}
          size="xl"
          leftSection={<Search size={24} />}
          rightSection={
            <Button
              size="lg"
              radius="100px"
              color="primary"
              variant="filled"
              onClick={handleSearch}
              disabled={!inputTerm.trim()}
            >
              <Text fw={600}>Search</Text>
            </Button>
          }
          onKeyDown={handleKeyPress}
        /></Paper>
      </Group>
    </>
  );
};

export default HomeSearchInput;