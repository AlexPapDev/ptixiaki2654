import { useState } from 'react'

const inputs = [
  { label: 'First Name', name: 'firstname' },
  { label: 'Last Name', name: 'lastname' },
  { label: 'Email', name: 'email'},
  { label: 'Password', name: 'Password', type: 'password'},
]

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
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
          />
        </div>
      ))}
      <button type="submit">Create User</button>
    </form>
  )
}

export default SignUpScreen
