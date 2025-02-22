import { useEffect, useState } from 'react'
import Map from '../components/Map'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';
import useAppStore from '../utils/AppStore'
// import { search } from '../../../server/routes/monumentRoute'

// import './Navbar.css' // External CSS for navbar

const Monuments = () => {
  const { searchTerm, mapBounds } = useAppStore()
  const [searchParams] = useSearchParams();
  const passedTerm = searchParams.get('q') || searchTerm

  const [monuments, setMonuments] = useState({data: []})
  // const [mapHasLoaded, setMapHasLoaded] = useState(false)

  const fetchData = async ({passedTerm, mapBounds}) => {
    if (!mapBounds) return
    const monuments = await axios.get(`http://localhost:5001/api/monuments/`, {
      params: { query: passedTerm, mapBounds: {
        ne: { ...mapBounds._ne },
        sw: { ...mapBounds._sw },
      } }
    })

    setMonuments(monuments)
    // setMapHasLoaded(true)
  }

  useEffect(() => {
    fetchData({passedTerm, mapBounds})
  }, [])

  useEffect(() => {
    fetchData({passedTerm, mapBounds})
  }, [passedTerm, mapBounds])

  return (
    <div style={{display:'flex', justifyContent: 'space-between'}}>
      <section>
        {monuments?.data?.map((monument, i) => {
          const { name, description, longitude, latitude } = monument
          const id = 'monumentMap' + i + name + description
          return (
            <div style={{marginBottom: '1em'}} key={id}>
              <div>{i+1}</div>
              <div>{name}</div>
              <div>{longitude + '1, ' +latitude}</div>
              <div>- - - </div>
            </div>
          )
        })}
      </section>
      {<Map data={monuments.data} fetchData={fetchData}></Map>}
    </div>
  )
}

export default Monuments
