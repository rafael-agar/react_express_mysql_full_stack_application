import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ usuario, children, redirectTo = "/asistencia",}) => {
  if (!usuario) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
}
