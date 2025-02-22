import { useState } from "react";

const UserProfileEdit = ({ user, onSave }) => {
  const [formData, setFormData] = useState(user)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData) // Calls parent function to update
  }

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(user).map((key) => (
        <div key={key}>
          <label>{key}:</label>
          <input name={key} value={formData[key]} onChange={handleChange} />
        </div>
      ))}
      <button type="submit">Save</button>
    </form>
  )
}

export default UserProfileEdit