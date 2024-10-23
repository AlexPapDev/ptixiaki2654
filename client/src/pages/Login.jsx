import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// import './Navbar.css' // External CSS for navbar

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Email:", email)
    console.log("Password:", password)
    const result = await axios.post('http://localhost:5001/api/users/login', {
      email, password
    })
    console.log(result)
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
