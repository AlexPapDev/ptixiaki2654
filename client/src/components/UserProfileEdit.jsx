import { useState } from "react"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input name="firstname" value={userState.firstname} onChange={handleChange} />
      </div>
      <div>
        <label>Last Name:</label>
        <input name="lastname" value={userState.lastname} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input name="email" type="email" value={userState.email} onChange={handleChange} />
      </div>
      <div>
        <label>Profile Picture:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <div>
        <label>Role:</label>
        <p>{user.role}</p> {/* Role is displayed as text and not editable */}
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default UserProfileEdit;
