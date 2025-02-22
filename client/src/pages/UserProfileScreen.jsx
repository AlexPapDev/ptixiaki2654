import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import useAppStore from '../utils/AppStore'
import UserProfileEdit from '../components/UserProfileEdit'
import UserProfileView from '../components/UserProfileView'

const UserProfile = ({}) => {
  // logged in user
  const { userInfo, isLoggedIn } = useAppStore()
  // url user id
  const { userId } = useParams()
  const [pageUser, setPageUser] = useState()
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    if (userId !== userInfo?.user?.userid) fetchUser(userId)
  }, [userId, userInfo])

  const fetchUser = async (userId) => {
    const result = await axios.get(`http://localhost:5001/api/users/${userId}`)
    setPageUser(result.data.rows[0])
  }

  //TODO: implment this on the server
  const handleUpdate = async (updatedData) => {
    const res = await axios.patch(`http://localhost:5001/api/users/${userId}`, updatedData)
    console.log(res)
    setPageUser(updatedData)
    setIsEditMode(false) // Exit edit mode after updating
  }

  if (!isLoggedIn) return <p>Log in to see this page</p>

  const renderedUser = pageUser || userInfo.user
  return (
    <div>
      <button onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? "Cancel" : "Edit Profile"}
      </button>
      {isEditMode ? (
        <UserProfileEdit user={userInfo.user} onSave={handleUpdate} />
      ) : (
        <UserProfileView user={renderedUser} />
      )}
    </div>
  );
}

export default UserProfile