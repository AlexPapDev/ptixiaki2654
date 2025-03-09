import { useState } from "react"

const formStyle = {
  width: '200px',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
}

const inputWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: '4px',
  width: '100%',
}

const inputStyle = {
  width: '100%',
}
const UserProfileEdit = ({ user, onSave, updateUser }) => {
  const [userState, setUserState] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  })
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email } = userState
    const formData = new FormData()
    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('email', email)
    
    if (selectedFile) {
      formData.append('image', selectedFile)
    }

    // const updatedUserData = { ...formData, profilepicture: imageUrl };
    const res = await onSave(formData)
    const { user } = res.data
    console.log(res)
    updateUser({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      profileimageurl: user.profileimageurl,
    })
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputWrapperStyle}>
        <label>First Name:</label>
        <input style={inputStyle} name="firstname" value={userState.firstname} onChange={handleChange} />
      </div>
      <div style={inputWrapperStyle}>
        <label>Last Name:</label>
        <input style={inputStyle} name="lastname" value={userState.lastname} onChange={handleChange} />
      </div>
      <div style={inputWrapperStyle}>
        <label>Email:</label>
        <input style={inputStyle} name="email" type="email" value={userState.email} onChange={handleChange} />
      </div>
      <div style={inputWrapperStyle}>
        <label>Profile Picture:</label>
        <input style={inputStyle} type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default UserProfileEdit;
