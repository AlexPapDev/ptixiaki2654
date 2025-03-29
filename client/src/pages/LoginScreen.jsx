import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const { loginUser, isLoggedIn } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginError('')

    try {
      const result = await loginUser(email, password)
      if (!result.success) throw new Error(result.message)
      
      const { user } = result
      if (!user.hasVerifiedOtp) {
        return navigate({
          pathname: '/otpverification',
          search: `?email=${user.email}`,
        })
      }

      navigate(`/user/${user.userid}`)
    } catch (error) {
      setLoginError(error.message || 'Login failed. Please try again.')
    }
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px', width: '200px', margin: 'auto' }}>
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
          <button type='submit'>Login</button>
        </div>
        {loginError && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{loginError}</p>}
      </form>
    </div>
  )
}

export default Login
