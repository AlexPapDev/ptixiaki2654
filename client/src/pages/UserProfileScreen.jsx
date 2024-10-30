import React from 'react'

import useAppStore from '../utils/AppStore'

const UserProfile = ({}) => {
  const { userInfo, isLoggedIn } = useAppStore()

  return (<>
      {isLoggedIn && Object.keys(userInfo.user).map(key => {
        return <div>
          <p>{`${key}: ${userInfo.user[key]}`}</p>
        </div>
      })}
    </>
  )
}

export default UserProfile