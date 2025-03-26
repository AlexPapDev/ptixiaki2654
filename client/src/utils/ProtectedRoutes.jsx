import React from "react"
import { Navigate } from "react-router-dom"
import useAuthStore from "./AuthStore"

const ProtectedRoutes = ({ children, requiredRoles = [] }) => {
  const { isLoggedIn, getRole } = useAuthStore()

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />
  }

  if (requiredRoles.length && !requiredRoles.includes(getRole())) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoutes
