import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../utils/AppStore'
import { TextInput, useMantineTheme, ActionIcon, Paper } from '@mantine/core'
import { Search } from 'lucide-react'

const NavSearchBar = () => {
  const { setSearchTerm, searchTerm } = useAppStore()
  const theme = useMantineTheme()
  const [inputTerm, setInputTerm] = useState(searchTerm || '')
  const navigate = useNavigate()
  const onClickButton = () => {
    // TODO: do we really need this? maybe remove
    setSearchTerm(inputTerm)
    navigate(`/monuments?q=${inputTerm}`)
  }
  return (
    <Paper shadow="sm" radius="lg">
      <TextInput
        radius="lg"
        placeholder="Search Monuments"
        rightSectionWidth={34}
        onChange={(e) => setInputTerm(e.target.value)} value={inputTerm} 
        rightSection={
          <ActionIcon size={28} radius="md" color={theme.primaryColor} variant="filled" onClick={onClickButton}>
            <Search size={20} color="white"/>
          </ActionIcon>
        }
      />
    </Paper>
  )
}

export default NavSearchBar