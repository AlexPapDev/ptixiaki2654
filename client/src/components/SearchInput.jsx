import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../utils/AppStore'

const buttonStyle = {
  padding: '2px',
}

const NavSearchBar = () => {
  const { setSearchTerm, searchTerm } = useAppStore()
  const [inputTerm, setInputTerm] = useState(searchTerm || '')
  const navigate = useNavigate()
  const onClickButton = () => {
    // TODO: do we really need this? maybe remove
    setSearchTerm(inputTerm)
    navigate(`/monuments?q=${inputTerm}`)
  }
  return (
    <div className="relative">
      <input style={buttonStyle} type="search" onChange={(e) => setInputTerm(e.target.value)} value={inputTerm} />
      <button style={buttonStyle} type="submit" onClick={onClickButton}>Search</button>
    </div>
  )
}

export default NavSearchBar