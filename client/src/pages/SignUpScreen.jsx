import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAppStore from '../utils/AppStore'
const inputs = [
  { label: 'First Name', name: 'firstname' },
  { label: 'Last Name', name: 'lastname' },
  { label: 'Email', name: 'email'},
  { label: 'Password', name: 'password', type: 'password'},
  { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
]

const SignUpScreen = () => {
  const { user } = useAppStore()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001'
  // TODO: handle errors
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { firstname, lastname, email, password, confirmPassword } = formData
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!')
      return
    }

    try {
      const result = await axios.post(`${API_BASE_URL}/api/users/`, {
        firstname, lastname, email, password
      })
      console.log(result.data.message)
      navigate({
        pathname: '/otpverification',
        search: `?email=${formData.email}`,
      })
    } catch (error) {
      console.error(error)
      setErrorMessage('Error: ' + error.response.data.error)
    }
  }

  return (<>
    {errorMessage && (<div>{errorMessage}</div>)}
    <form onSubmit={handleSubmit}>
      {inputs.map(({ label, name, type='text' }) => (
        <div key={name}>
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            type={type}
            required
          />
        </div>
      ))}
      <button type="submit">Create User</button>
    </form>
  </>)
}

export default SignUpScreen
