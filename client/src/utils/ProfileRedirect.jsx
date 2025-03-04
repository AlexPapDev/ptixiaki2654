import React from "react";
import { Navigate } from "react-router-dom"
import useAppStore from "./AppStore"

const ProfileRedirect = () => {
  const { isLoggedIn, userInfo } = useAppStore()

  debugger
  if (isLoggedIn()) {
    // Redirect to /user/:userId if logged in
    return <Navigate to={`/user/${userInfo.user.userid}`} />
  } else {
    // Show an error message if not logged in
    return <div>You need to be logged in to access this page.</div>;
  }
}

export default ProfileRedirect;