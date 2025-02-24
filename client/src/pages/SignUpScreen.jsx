import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const inputs = [
  { label: 'First Name', name: 'firstname' },
  { label: 'Last Name', name: 'lastname' },
  { label: 'Email', name: 'email'},
  { label: 'Password', name: 'Password', type: 'password'},
]

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // TODO: handle errors
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { firstname, lastname, email, password } = formData
    try {
      const result = await axios.post(`http://localhost:5001/api/users/`, {
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
