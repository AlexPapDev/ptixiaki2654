import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import useAppStore from '../utils/AppStore'
import UserProfileEdit from '../components/UserProfileEdit'
import UserProfileView from '../components/UserProfileView'

const UserProfile = ({}) => {
  // logged in user
  const { user, isLoggedIn, loginUser, token, updateUser } = useAppStore()
  // url user id
  const { userId } = useParams()
  const [pageUser, setPageUser] = useState()
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    if (Number(userId) !== Number(user?.userid)) fetchUser(userId)
  }, [user, userId])

  const fetchUser = async (userId) => {
    const result = await axios.get(`http://localhost:5001/api/users/`, {
      params: {
        id: userId
      }
    })
    const user = result.data.data
    // TODO: token?
    setPageUser(result.data.data)
    // // update app store
    // loginUser({ user, token })
  }

  //TODO: implment this on the server
  const handleUpdate = async (updatedData) => {
    const res = await axios.patch(`http://localhost:5001/api/users/${userId}`, updatedData)
    setPageUser(updatedData)
    setIsEditMode(false) // Exit edit mode after updating
    return res
  }

  if (!isLoggedIn()) return <p>Log in to see this page</p>

  const renderedUser = pageUser || user
  return (
    <div>
      {/* TODO: hide if not own user page */}
      <button onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? "Cancel" : "Edit Profile"}
      </button>
      {isEditMode ? (
        <UserProfileEdit onSave={handleUpdate} user={user} updateUser={updateUser} />
      ) : (
        <UserProfileView user={renderedUser} />
      )}
    </div>
  );
}

export default UserProfile