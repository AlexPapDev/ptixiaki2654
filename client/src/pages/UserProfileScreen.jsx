import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
import useAppStore from '../utils/AppStore'

const UserProfile = ({}) => {
  // logged in user
  const { userInfo, isLoggedIn } = useAppStore()

  // url user id
  const { userId } = useParams()
  const [pageUser, setPageUser] = useState()
  const fetchUser = async (userId) => {
    const result = await axios.get(`http://localhost:5001/api/users/${userId}`)
    setPageUser(result.data.rows[0])
  }
  useEffect(() => {
    if (userId !== userInfo?.user?.userid) fetchUser(userId)
  }, [userId, userInfo])

  const renderedUser = pageUser || userInfo
  if (!isLoggedIn) {
    return <>log in to see this pagew</>
  } return (<>
    {renderedUser && Object.keys(renderedUser).map(key => {
      return <div>
        <p>{`${key}: ${renderedUser[key]}`}</p>
      </div>
    })}
  </>
  )
}

export default UserProfile