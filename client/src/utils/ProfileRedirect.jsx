import React from "react";
import { Navigate } from "react-router-dom"
import useAuthStore from "./AuthStore"

const ProfileRedirect = () => {
  const { isLoggedIn, user } = useAuthStore()

  if (isLoggedIn()) {
    return <Navigate to={`/user/${user.userid}`} />
  } else {
    return <Navigate to="/login" replace />
  }
}

export default ProfileRedirect