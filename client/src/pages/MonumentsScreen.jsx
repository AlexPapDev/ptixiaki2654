import { useEffect, useState } from 'react'
import Map from '../components/Map'
import axios from 'axios'
import useAppStore from '../utils/AppStore'

// import './Navbar.css' // External CSS for navbar

const Monuments = () => {
  const { searchTerm } = useAppStore()
  const [monuments, setMonuments] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      console.log('searchTerm: ' + searchTerm)
      const monuments = await axios.get(`http://localhost:5001/api/monuments/`, {
        params: { query: searchTerm }
      })
      setMonuments(monuments)
    }
    fetchData()
  }, [searchTerm])

  return (
    <div style={{display:'flex', justifyContent: 'space-between'}}>
      <section>
        {monuments?.data?.map(monument => {
          const { name, description, longitude, latitude } = monument
          return (
            <div style={{marginBottom: '1em'}}>
              <div>{name}</div>
              <div>{longitude + '1, ' +latitude}</div>
            </div>
          )
        })}
      </section>
      <Map monuments={monuments}></Map>
    </div>
  )
}

export default Monuments
