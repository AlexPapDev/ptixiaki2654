import { useEffect, useState } from 'react'
import Map from '../components/Map'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import useAppStore from '../utils/AppStore'
import MonumentCard from '../components/MonumentCard'
// import { search } from '../../../server/routes/monumentRoute'

// import './Navbar.css' // External CSS for navbar

const Monuments = () => {
  const { searchTerm, mapBounds } = useAppStore()
  const [searchParams] = useSearchParams()
  const passedTerm = searchParams.get('q') || searchTerm

  const [monuments, setMonuments] = useState([])
  // const [mapHasLoaded, setMapHasLoaded] = useState(false)
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'
  const fetchData = async ({passedTerm, mapBounds}) => {
    if (!mapBounds) return

    try {
      const result = await axios.get(`${API_BASE_URL}/api/monuments/`, {
        params: { 
          query: passedTerm, mapBounds: {
            ne: { ...mapBounds._ne },
            sw: { ...mapBounds._sw },
          }
        }
      })
      const { monuments } = result.data.data
      setMonuments(monuments)
      // setMapHasLoaded(true)
    } catch (error) {
      console.error('Error fetching monuments:', error);
    }
  }

  useEffect(() => {
    fetchData({passedTerm, mapBounds})
  }, [])

  useEffect(() => {
    fetchData({passedTerm, mapBounds})
  }, [passedTerm, mapBounds])

  return (
    <div style={{display:'flex'}}>
      <section className="content_section grid m-t-1">
        {monuments?.map((monument, i, arr) => <MonumentCard monument={monument} className="cell" key={'monument-card-' + i}></MonumentCard>)}
      </section>
      <section className="map_section">
        {<Map data={monuments} fetchData={fetchData}></Map>}
      </section>
      
    </div>
  )
}

export default Monuments
