import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAppStore from '../utils/AppStore'

// import './Navbar.css' // External CSS for navbar

const Login = ({setState}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState({})
  const { loginUser, user } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle login logic here

    try  {
      const result = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email, password
      })
      const { user } = result.data
      // case where user hasn't validated
      if (!user.hasVerifiedOtp) {
        return navigate({
          pathname: '/otpverification',
          search: `?email=${user.email}`,
        })
      }

      loginUser(result.data)
      navigate(`/user/${user.userid}`)
    } catch (e) {
      setLoginError(e)
      debugger
    } 
  }
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px', width: '200px', margin: 'auto'}}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit'>
            Login
          </button>
        </div>
        {!!Object.keys(loginError).length && <p>{JSON.stringify(loginError)}</p>}
      </form>
    </div>
  )
}

export default Login
