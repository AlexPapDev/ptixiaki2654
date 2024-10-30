import {useState} from 'react'
import useAppStore from '../utils/AppStore'
const NavSearchBar = () => {
  const { setSearchTerm } = useAppStore()
  const [inputTerm, setInputTerm] = useState('')
  const onClickButton = () => {
    setSearchTerm(inputTerm)
  }
  return (
    <div className="relative">
      <input type="search" onChange={(e) => setInputTerm(e.target.value)} value={inputTerm} />
      <button type="submit" onClick={onClickButton} >Search</button>
    </div>
  )
}

export default NavSearchBar