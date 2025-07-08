import { useEffect, useState } from 'react'
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
  LoadingOverlay
} from '@mantine/core'

const Login = ({onClose}) => {
  const { loginUser, isLoggedIn } = useAuthStore()
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size={420} mb={20}>
      <Title align='center' order={2}>
        Welcome back
      </Title>
      <Paper radius='md'>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
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
            <Text c='red' size='sm' mt='lg' align='center'>
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
