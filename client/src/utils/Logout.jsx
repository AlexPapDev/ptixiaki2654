import React from "react";
import { Navigate } from "react-router-dom"
import useAppStore from "./AppStore"

const Logout = () => {
  const { logoutUser } = useAppStore()
  logoutUser()
  return <Navigate to={`/`} />
}

export default Logout;