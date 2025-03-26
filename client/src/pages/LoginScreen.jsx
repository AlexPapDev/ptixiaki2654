import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'

// import './Navbar.css' // External CSS for navbar

const Login = ({setState}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState({})
  const { loginUser, user } = useAuthStore()
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
      
      const result = await loginUser(email, password)
      if (!result.success) throw Error(result.message)
      debugger
      const { user } = result
      // case where user hasn't validated
      if (!user.hasVerifiedOtp) {
        return navigate({
          pathname: '/otpverification',
          search: `?email=${user.email}`,
        })
      }

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
