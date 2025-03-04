import { useState } from "react";

const UserProfileEdit = ({ user, onSave, updateUser }) => {
  const [formData, setFormData] = useState(user)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const res = onSave(formData) // Calls parent function to update
    updateUser(formData)
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