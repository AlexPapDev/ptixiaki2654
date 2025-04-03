import { useState, useEffect } from 'react'
import Map from '../components/Map'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import useAppStore from '../utils/AppStore'
import MonumentCard from '../components/MonumentCard'

const Monuments = () => {
  const { searchTerm, mapBounds } = useAppStore()
  const [searchParams] = useSearchParams()
  const passedTerm = searchParams.get('q') || searchTerm
  const category = searchParams.get('cat') || ''

  const [monuments, setMonuments] = useState([])
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'

  const fetchData = async () => {
    if (!mapBounds) return
    try {
      const result = await axios.get(`${API_BASE_URL}/api/monuments/`, {
        params: { 
          query: passedTerm,
          category,
          mapBounds: {
            ne: { ...mapBounds._ne },
            sw: { ...mapBounds._sw },
          }
        }
      })
      setMonuments(result.data.data.monuments)
    } catch (error) {
      console.error('Error fetching monuments:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [passedTerm, mapBounds, category])

  return (
    <div style={{display:'flex'}}>
      <section className="content_section grid m-t-1">
        {monuments?.map((monument, i) => (
          <MonumentCard monument={monument} className="cell" key={'monument-card-' + i} />
        ))}
        {/* duplicate for more results */}
         {monuments?.map((monument, i) => (
          <MonumentCard monument={monument} className="cell" key={'monument-card-' + i} />
        ))}
      </section>
      <section className="map_section">
        <Map data={monuments} fetchData={fetchData} />
      </section>
    </div>
  )
}

export default Monuments
