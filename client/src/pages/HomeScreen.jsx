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
  
  return (
    <div>Hello this is the home page!</div>
  )
}

export default Home
