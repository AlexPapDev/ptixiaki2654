import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../utils/AuthStore'
import useUserStore from '../stores/domain/UserStore'
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

const inputs = [
  { label: 'First Name', name: 'firstname' },
  { label: 'Last Name', name: 'lastname' },
  { label: 'Email', name: 'email' },
  { label: 'Password', name: 'password', type: 'password' },
  { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
]

const SignUp = ({ onClose }) => {
  const { isLoggedIn } = useAuthStore()
  const navigate = useNavigate()
  const { signupUser } = useUserStore()
  const {
    formData,
    errorMessage,
    setErrorMessage,
    handleChange,
  } = useAuthForm({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }
    const result = await signupUser({
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
    })
    if (result.success) {
      navigate({
        pathname: '/otpverification',
        search: `?email=${formData.email}`,
      })
      onClose()
    } else {
      setErrorMessage(result.error)
    }
  }

  return (
    <Container size={420} mb={20}>
      <Title align="center" order={2}>
        Create a New Account
      </Title>
      <Paper>
        <form onSubmit={handleSubmit}>
          <Stack>
            {inputs.map(({ label, name, type = 'text' }) => (
              <FormInput
                key={name}
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                type={type}
              />
            ))}
          </Stack>
          {errorMessage && (
            <Text color="red" size="sm" mt="md" align="center">
              {errorMessage}
            </Text>
          )}
          <Button fullWidth mt="xl" type="submit" color="teal">
            Create Account
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default SignUp
