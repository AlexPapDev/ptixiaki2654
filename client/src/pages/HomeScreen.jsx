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
  
  return (<div style={{padding: '32px', textAlign: 'align-left'}}>
    <h2 class="align-left">Discover Greece's rich history</h2>
    <h3 class="align-left" style={{paddingTop: '20px'}}>Recent Activity:</h3>
  </div>)
}

export default Home
