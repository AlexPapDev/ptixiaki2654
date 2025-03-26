import React from "react";
import { Navigate } from "react-router-dom"
import useAuthStore from "./AuthStore"

const Logout = () => {
  const { logoutUser } = useAuthStore()
  logoutUser()
  return <Navigate to={`/`} />
}

export default Logout