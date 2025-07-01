import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
import useAuthForm from '../hooks/useAuthForm'
import FormInput from './FormInput'
import {
  Button,
  Paper,
  Title,
  Text,
  Container,
  Stack,
} from '@mantine/core'

const Login = ({onClose}) => {
  const { loginUser, isLoggedIn } = useAuthStore()
  const navigate = useNavigate()
  const {
    formData,
    errorMessage,
    setErrorMessage,
    handleChange,
  } = useAuthForm({ email: '', password: '' })

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    try {
      const result = await loginUser(formData.email, formData.password)
      if (!result.success) throw new Error(result.message)
      const { user } = result
      if (!user.hasVerifiedOtp) {
        return navigate({
          pathname: '/otpverification',
          search: `?email=${user.email}`,
        })
      }
      navigate(`/user/${user.userid}`)
      onClose()
    } catch (error) {
      setErrorMessage(error.message || 'Login failed. Please try again.')
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
            <FormInput
              label='Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              type='text'
            />
            <FormInput
              label='Password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              type='password'
            />
          </Stack>
          {errorMessage && (
            <Text color='red' size='sm' mt='md' align='center'>
              {errorMessage}
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
