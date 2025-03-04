import { useEffect, useState } from 'react'
import Map from '../components/Map'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import useAppStore from '../utils/AppStore'
// import { search } from '../../../server/routes/monumentRoute'

// import './Navbar.css' // External CSS for navbar

const Monuments = () => {
  const { searchTerm, mapBounds } = useAppStore()
  const [searchParams] = useSearchParams()
  const passedTerm = searchParams.get('q') || searchTerm

  const [monuments, setMonuments] = useState([])
  // const [mapHasLoaded, setMapHasLoaded] = useState(false)

  const fetchData = async ({passedTerm, mapBounds}) => {
    if (!mapBounds) return
    const result = await axios.get(`http://localhost:5001/api/monuments/`, {
      params: { query: passedTerm, mapBounds: {
        ne: { ...mapBounds._ne },
        sw: { ...mapBounds._sw },
      } }
    })
    const { monuments } = result.data.data
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
    <div style={{display:'flex'}}>
      <section className="content_section">
        {monuments?.map((monument, i, arr) => {
          const isLastIteration = i === arr.length - 1
          const style = !isLastIteration ? {marginBottom: '2em'} : {}
          const { name, description, longitude, latitude } = monument
          const id = 'monumentMap' + i + name + description
          return (
            <div style={style} key={id}>
              <div>{i+1}</div>
              <div>{'name: ' + name}</div>
              <div>{'description: ' + description}</div>
              <div>{longitude + '1, ' +latitude}</div>
              <div>- - - </div>
            </div>
          )
        })}
      </section>
      <section className="map_section">
        {<Map data={monuments} fetchData={fetchData}></Map>}
      </section>
      
    </div>
  )
}

export default Monuments
