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
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle login logic here

    try  {
      const result = await axios.post('http://localhost:5001/api/users/login', {
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>
          Login
        </button>
        {!!Object.keys(loginError).length && <p>{JSON.stringify(loginError)}</p>}
      </form>
    </div>
  )
}

export default Login
