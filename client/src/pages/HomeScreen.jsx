import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const monuments = [] //await axios.get(`http://localhost:5001/api/monuments`)
      console.log(monuments)
    }
    fetchData()
  }, [])
  
  return (<>
    <div>Discover Greece's rich history</div>
    <div>Recent activity</div>
  </>)
}

export default Home
