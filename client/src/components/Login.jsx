import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
import useAppStore from '../utils/AppStore'
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Stack,
} from '@mantine/core'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const { closeAuthModal } = useAppStore()
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
      closeAuthModal()
    } catch (error) {
      setLoginError(error.message || 'Login failed. Please try again.')
    }
  }

  return (
    <Container size={420} mb={20}>
      <Title align='center' order={2}>
        Welcome back
      </Title>

      <Paper radius='md'>
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label='Email'
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              label='Password'
              placeholder='Your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Stack>

          {loginError && (
            <Text color='red' size='sm' mt='md' align='center'>
              {loginError}
            </Text>
          )}

          <Button fullWidth mt='xl' type='submit' color="teal">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
